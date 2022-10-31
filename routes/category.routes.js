const { Router } = require('express')
const { check } = require('express-validator')
const {
  createCategory,
  getCategories,
} = require('../controllers/category.controller')
const { validateJWT } = require('../middlewares')
const { validateFileds } = require('../middlewares/validate-fields')
const category = require('../models/category')

const router = Router()

router.get('/', getCategories)

router.get(
  '/:id',
  [
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(categoryByIdExists),
    validateFileds,
  ],
  getCategoryById
)

router.post(
  '/',
  [
    validateJWT,
    check('name', 'El nombre es requerido').not().isEmpty(),
    validateFileds,
  ],
  createCategory
)

router.put(
  '/:id',
  [
    validateJWT,
    check('id', 'El ID no es válido').isMongoId(),
    check('id').custom(categoryByIdExists),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateFileds,
  ],
  updateCategory
)

router.delete(
  '/:id',
  [
    validateJWT,
    isRole('ADMIN_ROLE'),
    check('id', 'El ID no es válido').isMongoId(),
    check('id').custom(categoryByIdExists),
    validateFileds,
  ],

  deleteCategory
)

module.exports = router
