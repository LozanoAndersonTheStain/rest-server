const validateFileds = require('./validate-fields')
const validateJWT = require('./validate-jwt')
const validateRole = require('./validate-role')

module.exports = {
  ...validateFileds,
  ...validateJWT,
  ...validateRole,
}
