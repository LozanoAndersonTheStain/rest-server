const { Schema, model } = require('mongoose')

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, 'El nombre es requerido'],
  },
  email: {
    type: String,
    required: [true, 'El email es requerido'],
    unique: true,
    password: {
      type: String,
      required: [true, 'La contraseña es requerida'],
    },
  },
  Img: {
    type: String,
  },
  role: {
    type: String,
    required: [true, 'El rol es requerido'],
    enum: ['ADMIN_ROLE', 'USER_ROLE'],
  },
  status: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
})

module.exports = model('users', UserSchema)
