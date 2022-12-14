const { Router } = require('express')
const { check } = require('express-validator')

const {
  isValidRole,
  emailExists,
  userByIdExists,
} = require('../helpers/db-validator')

const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUsersById,
} = require('../controllers/user.controller')

// const { validateJWT } = require('../middlewares/validate-jwt')
// const { validateFileds } = require('../middlewares/validate-fields')
// const { isRole } = require('../middlewares/validate-role')

const { isRole, validateJWT, validateFileds } = require('../middlewares')

const router = Router()

router.get('/', getUsers)

router.get('/:id', getUsersById)

router.post(
  '/',
  [
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('email', 'El email es requerido').not().isEmpty(),
    check('email', 'El correo no es valido').isEmail(),
    check('email').custom(emailExists),
    check('password', 'La contraseña es requerida').not().isEmpty(),
    check(
      'password',
      'La contraseña debe contener más de 6 caracteres'
    ).isLength({ min: 6 }),
    check('role', 'El rol es requerido').not().isEmpty(),
    check('role').custom(isValidRole),

    // Disparador de respuesta

    validateFileds,
  ],
  createUser
)

router.put(
  '/:id',
  [
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(userByIdExists),
    validateFileds,
  ],
  updateUser
)

router.delete(
  '/:id',
  [
    isRole('ADMIN_ROLE', 'USER_ROLE'),
    validateJWT,
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(userByIdExists),
    validateFileds,
  ],
  deleteUser
)

module.exports = router
