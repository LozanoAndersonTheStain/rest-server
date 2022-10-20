const Role = require('../models/role')
const User = require('../models/user')

const isValidRole = async (role = '') => {
  const existsRole = await Role.findOne({ role })
  if (!existsRole) {
    throw new Error(`El rol ${role} no está registrado en la BD`)
  }
}

const emailExists = async (email = '') => {
  const user = await User.findOne({ email })
  if (user) {
    throw new Error('Este correo ya ha sido registrado')
  }
}

module.exports = {
  isValidRole,
  emailExists,
}
