const { addCategory, getAllCategories, getCategoryDetails, updateCategory, deleteCategory } = require('../controller/categoryController')
const router = require('express').Router()

// endpoints
router.post('/category', addCategory)
// router.get('/category', getAllCategories)

router.get('/getallcategories', getAllCategories)

router.get('/category/:id', getCategoryDetails)
router.put('/updatecategory/:id',updateCategory)

router.delete('/deletecategory/:id', deleteCategory)

module.exports =router