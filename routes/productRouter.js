const { addProduct, getAllProducts, getProductDetails, getProductByCategory } = require('../controller/productController')
const upload = require('../utils/fileUpload')

const router = require('express').Router()

router.post('/addnewproduct', upload.single('product_image'), addProduct)
router.get('/getallproducts' , getAllProducts)
router.get('/getproductdetails/:id', getProductDetails)
router.get('/getproductbycategory/:category_id', getProductByCategory)


module.exports = router