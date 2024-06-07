const { validationResult, check } = require('express-validator')

exports.categoryCheck = [
    check('category_name', 'Category name is required').notEmpty()
        .isLength({ min: 3 }).withMessage("Category name must be at least 3 characters")
]


exports.validate = (req, res, next) => {
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg })
        // return res.status(400).json({error: errors.array().map(err=>err.msg)})
    }
    next()
}

exports.productCheck = [
    check('title', 'Product title is required').notEmpty()
        .isLength({ min: 3 }).withMessage("Product name must be at least 3 characters"),

    check('price', 'Price is required').notEmpty()
        .isNumeric().withMessage('Price must be a number'),

    check('description', 'Description is required').notEmpty()
        .isLength({ min: 20 }).withMessage('Description must be at least 20 characters'),

    check('count_in_stock', 'count in stock is requried').notEmpty()
        .isNumeric().withMessage('Count must be a number')
]

exports.userCheck = [
    check('username', "Username is required").notEmpty()
        .isLength({ min: 3 }).withMessage("Username must be at least 3 characters")
        .not().isIn(["admin","ADMIN","test"]).withMessage("This username is not allowed")
    ,
    check('email', "email is required")
        .isEmail().withMessage("Email format incorrect"),
    check('password', "Password is requried").notEmpty()
        .matches(/[a-z]/).withMessage("Password must contain at least 1 lowercase alphabet")
        .matches(/[A-Z]/).withMessage("Password must contain at least 1 uppercase alphabet")
        .matches(/[0-9]/).withMessage("Password must contain at least 1 number")
        .matches(/[!@#$\-]/).withMessage("Password must contain at least 1 special character")
        .isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
        .not().isIn(['P@ssw0rd']).withMessage("P@ssw0rd is not allowed"),
    // check('gender')
    //     .isIn(['male', 'female']).withMessage("Gender must be either male or female")


]