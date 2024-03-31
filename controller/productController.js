const ProductModel = require('../model/ProductModel')

// add new product
exports.addProduct = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "Product image is required" })
    }

    try {
        let product = await ProductModel.create({
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            category: req.body.category,
            count_in_stock: req.body.count_in_stock,
            product_image: req.file?.path
        })
        if (!product) {
            return res.status(400).json({ error: "Something went wrong" })
        }
        res.send(product)
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// get all products
exports.getAllProducts = async (req, res) => {
    let products = await ProductModel.find().populate('category', 'category_name')
    if (!products) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    res.send(products)
}

// get product details
exports.getProductDetails = async (req, res) => {
    let product = await ProductModel.findById(req.params.id).populate('category')
    if (!product) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    res.send(product)
}

// get products by category
exports.getProductByCategory = async (req, res) => {
    let products = await ProductModel.find({
        category: req.params.category_id
    }).select('title').select('price')
    if (!products) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    res.send(products)
}


// update product
exports.updateProduct = async (req, res) => {
    try {
        let product = await ProductModel.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            category: req.body.category,
            count_in_stock: req.body.count_in_stock,
            product_image: req.file?.path
        }, { new: true })
        if (!product) {
            return res.status(400).json({ error: "Something went wrong" })
        }
        res.send(product)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// delete Product 
exports.deleteProduct = (req, res) => {
    ProductModel.findByIdAndDelete(req.params.id)
        .then(product => {
            if (!product) {
                return res.status(400).json({ error: "Product not found" })
            }
            else {
                res.send({ message: "Product deleted Successfully" })
            }
        })
        .catch(error =>
            res.status(500).json({ error: error.message })
        )
}
