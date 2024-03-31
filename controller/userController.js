const UserModel = require('../model/userModel')
const AddressModel = require("../model/addressMOdel")
const bcrypt = require('bcrypt')


// register
exports.register = async (req, res) => {
    let { username, email, password, date_of_birth, gender, street, city, state, zipcode, country, country_code, phone } = req.body

    // check if username already exists
    let user = await UserModel.findOne({ username })
    if (user) {
        return res.status(400).json({ error: "Username already taken, choose another username" })
    }

    // check if email already used
    user = await UserModel.findOne({ email })
    if (user) {
        return res.status(400).json({ error: "Email already in use. Please login to continue" })
    }

    // record the address -> _id
    let address = await AddressModel.create({
        street, city, state, zipcode, country, country_code, phone
    })

    if (!address) {
        return res.status(400).json({ error: "Something to wrong, please try again later" })
    }

    // encrypt password
    let salt = await bcrypt.genSalt(10)
    let hashed_password = await bcrypt.hash(password, salt)


    // register
    let new_user = await UserModel.create({
        username,
        email,
        password: hashed_password,
        gender,
        date_of_birth,
        address: address._id
    })


    // send verification link(generate token) in email

    if (!new_user) {
        return res.status(400).json({ error: "Failed to register" })
    }
    res.send(new_user)
}