const { addProduct, getAllProducts, getProductDetails, getProductByCategory, updateProduct, deleteProduct } = require('../controller/productController')
const { checkAdmin } = require('../controller/userController')
const upload = require('../utils/fileUpload')
const { productCheck, validate } = require('../validation')

const router = require('express').Router()

// router.post('/addnewproduct',upload.single('product_image'),checkAdmin, productCheck, validate, addProduct)
router.post('/addnewproduct',upload.single('product_image'), productCheck, validate, addProduct)
router.get('/getallproducts' , getAllProducts)
router.get('/getproductdetails/:id', getProductDetails)
router.get('/getproductbycategory/:category_id', getProductByCategory)
router.put('/updateproduct/:id', upload.single('product_image'), updateProduct)
// router.delete('/deleteproduct/:id', checkAdmin, deleteProduct)
router.delete('/deleteproduct/:id', deleteProduct)



module.exports = router