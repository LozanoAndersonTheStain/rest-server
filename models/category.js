const { Schema, model } = require('mongoose')
//Esto es un molde para una base de datos

const CategorySchema = Schema({
  name: {
    type: String,
    required: [true, 'El nombre es requerido'],
    unique: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
})

CategorySchema.methods.toJSON = function () {
  const { __v, _id, ...category } = this.toObject()
  category.id = _id

  const { _id: u_id, password, __v: u__v, ...user } = category.user
  user.id = u_id
  category.user = user

  return category
}

module.exports = model('Category', CategorySchema)
