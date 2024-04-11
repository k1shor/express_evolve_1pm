const { addCategory, getAllCategories, getCategoryDetails, updateCategory, deleteCategory } = require('../controller/categoryController')
const { checkAdmin } = require('../controller/userController')
const { categoryCheck, validate } = require('../validation')
const router = require('express').Router()

// endpoints
router.post('/category', checkAdmin, categoryCheck, validate, addCategory)
// router.get('/category', getAllCategories)

router.get('/getallcategories', getAllCategories)

router.get('/category/:id', getCategoryDetails)
router.put('/updatecategory/:id',checkAdmin, updateCategory)

router.delete('/deletecategory/:id', checkAdmin, deleteCategory)

module.exports =router