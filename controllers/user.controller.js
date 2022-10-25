const { request, response } = require('express')
const bcryptjs = require('bcryptjs')

const User = require('../models/user')
const { body } = require('express-validator')
const user = require('../models/user')

const getUsers = async (req = request, res = response) => {
  // url/api/users/?name=Anderson&date=2022-10-31 -> query

  try {
    let { from = 0, lot = 5 } = req.query
    from = from <= 0 || isNaN(from) ? 0 : from - 1

    const query = { status: true }

    const [users, total] = await Promise.all([
      User.find({ query }).skip(from).limit(lot),
      User.countDocuments({ query }),
    ])

    req.res.status(200).json({
      total,
      quantity: users.length,
      users,
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

const getUsersById = (req = request, res = response) => {
  // url/api/users/14 -> Segmento: El 13 entra en el id

  const id = req.params.id
  res.json({
    msg: 'Usuario por id - Controler',
    id,
  })
}

const createUser = async (req, res) => {
  // url/api/users/-> Body: Es el objeto en JSON
  try {
    const { name, email, password, role } = req.body
    const user = new User({ name, email, password, role })

    //Verifica si el correo ya existe en la BD

    user.password = bcryptjs.hashSync(password, bcryptjs.genSaltSync())

    await user.save()

    res.status(201).json({
      msg: 'post API - Controller',
      user,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Error en el servidor',
    })
  }
}

const updateUser = async (req = request, res = response) => {
  try {
    const id = req.params.id
    const { password, google, ...date } = req.body

    if (password) {
      data.password = bcryptjs.hashSync(password, bcryptjs.genSaltSync())
    }

    const user = await User.findByIdAndUpdate(id, date, { new: true })

    res.json({
      // msg: 'put API - Controller',
      user,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Error en el servidor',
    })
  }
}

const deleteUser = async (req = request, res = response) => {
  try {
    const { id } = req.params

    // Borrado físico de la BD
    // const deleteUser = await User.findByIdAndDelete(id)

    // Borrado suave
    const deleteUser = await User.findByIdAndUpdate(
      id,
      { status: false },
      { new: true }
    )

    res.json({
      msg: 'delete API - Controller',
      deleteUser,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Error en el servidor',
    })
  }
}

module.exports = {
  getUsers,
  getUsersById,
  createUser,
  updateUser,
  deleteUser,
}
