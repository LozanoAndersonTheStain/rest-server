const { request } = require('express')
const { validationResult } = require('express-validator')

const validateFileds = (req = requestres, res = response, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json(errors)
  }
  next()
}

module.exports = {
  validateFileds,
}
