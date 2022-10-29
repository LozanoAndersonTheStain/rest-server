const { Router } = require('express')
const { check } = require('express-validator')
const {
  createCategory,
  getCategories,
} = require('../controllers/category.controller')
const { validateJWT } = require('../middlewares')
const { validateFileds } = require('../middlewares/validate-fields')

const router = Router()

router.get('/', getCategories)

router.get('/:id')

router.post(
  '/',
  [
    validateJWT,
    check('name', 'El nombre es requerido').not().isEmpty(),
    validateFileds,
  ],
  createCategory
)

router.put('/:id')

router.delete('/:id')

module.exports = router
