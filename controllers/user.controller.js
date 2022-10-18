const { request, response } = require('express')

const getUsers = (req = request, res = response) => {
  // url/api/users/?name=Anderson&date=2022-10-31 -> query

  const { name, date } = req.query

  req.res.status(200).json({
    msg: 'Get - Controller',
    name,
    date,
  })
}

const getUsersById = (req = request, res = response) => {
  // url/api/users/14 -> Segmento: El 13 entra en el id

  const id = req.params.id
  res.json({
    msg: 'Usuario por id - Controler',
    id,
  })
}

const createUser = (req, res) => {
  // url/api/users/-> Body: Es el objeto en JSON

  const { name, lastname, age } = req.body

  res.status(201).json({
    msg: 'post API - Controller',
    name,
  })
}

const updateUser = (req = request, res = response) => {
  const id = req.params.id
  const body = req.body

  res.json({
    msg: 'put API - Controller',
    id,
    body,
  })
}

const deleteUser = (req = request, res = response) => {
  const id = req.params.id
  res.json({
    msg: 'delete API - Controller',
  })
}

module.exports = {
  getUsers,
  getUsersById,
  createUser,
  updateUser,
  deleteUser,
}
