const UserModel = require('../model/userModel')
const AddressModel = require("../model/addressMOdel")
const TokenModel = require('../model/TokenModel')
const bcrypt = require('bcrypt')

const crypto = require('crypto')
const sendEmail = require('../utils/emailSender')
// const uuidv1 = require('uuidv1')


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
    // let salt = uuidv1()
    // let hashed_password = crypto.createHmac('sha256', salt).update('password').digest('hex')


    // register
    let new_user = await UserModel.create({
        username,
        email,
        password: hashed_password,
        gender,
        date_of_birth,
        address: address._id
    })

    // generate token
    let token = await TokenModel.create({
        token: crypto.randomBytes(24).toString('hex'),
        user: new_user._id
    })

    // send verification link(generate token) in email

const url = `http://localhost:5000/api/verifyemail/${token.token}`

    sendEmail({
        from:"noreply@something.com",
        to: email,
        subject: "Verification Email",
        text: `Copy paste the link in the browser to verify your account. ${url}`,
        html: `<a href='${url}'><button>Verify Account</button></a>`
    })

    if (!new_user) {
        return res.status(400).json({ error: "Failed to register" })
    }
    res.send(new_user)
}

// to verify user
exports.verifyUser = async (req, res) =>{
    // check token if valid or not
    let token = await TokenModel.findOne({token: req.params.token})
    if(!token){
        return res.status(400).json({error:"Invalid token or token may have expired"})
    }
    // find user
    let user = await UserModel.findById(token.user)
    if(!user){
        return res.status(400).json({error:"User associated with this token not found"})
    }
    // check if already verified
    if(user.isVerified){
        return res.status(400).json({error:"User already verified. Login to continue"})
    }
    // verify user
    user.isVerified = true
    user = await user.save()
    if(!user){
        return res.status(400).json({error:"Failed to verify. Please try again later."})
    }
    res.send({message: "user verified successfully."})

}

// resend verification
exports.resendVerification = async (req, res) => {
    // find if email is registered or not
    let user = await UserModel.findOne({email: req.body.email})
    if(!user){
        return res.status(400).json({error:"Email not registered"})
    }
    // check if password is valid or not
    let passwordCheck = await bcrypt.compare(req.body.password, user.password)
    if(!passwordCheck){
        return res.status(400).json({error:"Email and password do not match"})
    }
    // check if user is already verified
    if(user.isVerified){
        return res.status(400).json({error: "User already verified. Login to continue"})
    }
    // generate token, send verification link in email
    let token = await TokenModel.create({
        token: crypto.randomBytes(24).toString('hex'),
        user: user._id
    })
    if(!token){
        return res.status(400).json({error:"Something went wrong"})
    }
    const url = `http://localhost:5000/api/verifyemail/${token.token}`
    sendEmail({
        from: 'noreply@example.com',
        to: req.body.email,
        subject: "Verification Email",
        text: `Please click on the following link or copy paste it in browser to verify account. ${url}`,
        html: `<a href='${url}'><button>Verify Account</button></a>`
    })
    res.send({"message": "Verification Link has been sent to your email."})
}

// forget password
exports.forgetPassword = async (req, res)=> {
        // find if email is registered or not
        let user = await UserModel.findOne({email: req.body.email})
        if(!user){
            return res.status(400).json({error:"Email not registered"})
        }
        // generate token, send verification link in email
        let token = await TokenModel.create({
            token: crypto.randomBytes(24).toString('hex'),
            user: user._id
        })
        if(!token){
            return res.status(400).json({error:"Something went wrong"})
        }
        const url = `http://localhost:5000/api/resetpassword/${token.token}`
        sendEmail({
            from: 'noreply@example.com',
            to: req.body.email,
            subject: "Reset Password",
            text: `Please click on the following link or copy paste it in browser to reset your password. ${url}`,
            html: `<a href='${url}'><button>Reset Password</button></a>`
        })
        res.send({"message": "Password Reset Link has been sent to your email."})
    
}