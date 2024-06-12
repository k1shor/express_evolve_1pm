const { addCategory, getAllCategories, getCategoryDetails, updateCategory, deleteCategory } = require('../controller/categoryController')
const { checkAdmin } = require('../controller/userController')
const { categoryCheck, validate } = require('../validation')
const router = require('express').Router()

// endpoints
router.post('/addcategory', categoryCheck, validate, addCategory)
// router.get('/category', getAllCategories)

router.get('/getallcategories', getAllCategories)

router.get('/category/:id', getCategoryDetails)
router.put('/updatecategory/:id', updateCategory)

router.delete('/deletecategory/:id', deleteCategory)

module.exports =router