const { Router } = require('express')
const { check } = require('express-validator')
const { login } = require('../controllers/auth.constroller')

const { emailExists } = require('../helpers/db-validator')
const { validateFileds } = require('../middlewares/validate-fields')

const router = Router()

router.post(
  '/login',
  [
    check('email', 'El email es requerido').not().isEmpty(),
    check('password', 'El password es requerido').not().isEmpty(),
    
    validateFileds,
  ],

  login
)

module.exports = router
