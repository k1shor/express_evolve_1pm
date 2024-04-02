const { addProduct, getAllProducts, getProductDetails, getProductByCategory, updateProduct, deleteProduct } = require('../controller/productController')
const { register } = require('../controller/userController')
const upload = require('../utils/fileUpload')

const router = require('express').Router()

router.post('/addnewproduct', upload.single('product_image'), addProduct)
router.get('/getallproducts' , getAllProducts)
router.get('/getproductdetails/:id', getProductDetails)
router.get('/getproductbycategory/:category_id', getProductByCategory)
router.put('/updateproduct/:id', upload.single('product_image'), updateProduct)
router.delete('/deleteproduct/:id', deleteProduct)



module.exports = router