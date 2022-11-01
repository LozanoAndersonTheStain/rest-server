const { request, response } = require('express')
const Category = require('../models/category')

const getCategories = async (req = request, res = response) => {
  // URL/api/user/?name=Juan&age=18-08-2005 -- Query
  try {
    let { from = 0, lot = 5 } = req.query
    from = from <= 0 || isNaN(from) ? 0 : from - 1

    const query = { status: true }
    const [categories, total] = await Promise.all([
      Category.find(query).skip(from).limit(lot),
      Category.countDocuments(query),
    ])

    req.res.status(200).json({
      total,
      categories,
      from: from + 1,
      lot: Number(lot),
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Error en el servidor',
    })
  }
}

const getCategoryById = async (req = request, res = response) => {
  try {
    const { id } = req.params
    const category = await Category.findById(id).populate('user')

    res.status(200).json({
      category,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Error en el servidor',
    })
  }
}

const createCategory = async (req = request, res = response) => {
  // URL/api/user/ -- Body: activar raw y Json
  //Es el objeto en JSON
  // const {name, edad} = req.body

  try {
    const name = req.body.name.trim().toUpperCase()

    const categoryBD = await Category.findOne({ name })
    if (categoryBD) {
      return res.status(401).json({
        msg: `La categoria ${name} ya existe en la BD`,
      })
    }

    const data = {
      name,
      user: req.authenticatedUser,
    }

    const category = new Category(data)

    //Verificar si el correo ya existe en la BD
    await category.save()

    res.status(201).json({
      category,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Error en el servidor',
    })
  }
}

const updateCategory = async (req = request, res = response) => {
  try {
    const { id } = req.params
    const { state, user, ...data } = req.body
    data.name = data.name.trim().toUpperCase()
    data.user = req.authenticatedUser.id

    const categoryDB = await Category.findOne({ name: data.name })
    if (categoryDB) {
      return res.status(400).json({
        msg: `La categoría ${categoryDB.name} ya existe`,
      })
    }

    const category = await Category.findByIdAndUpdate(id, data, {
      new: true,
    })

    res.status(200).json({
      category,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Error en el servidor',
    })
  }
}

const deleteCategory = async (req = request, res = response) => {
  try {
    const { id } = req.params

    const deletedCategory = await Category.findByIdAndUpdate(
      id,
      {
        status: false,
      },
      {
        new: true,
      }
    )

    res.status(200).json({
      deletedCategory,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      msg: 'Error en el servidor',
    })
  }
}

module.exports = {
  getCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
}
