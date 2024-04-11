const { register, verifyUser, resendVerification, forgetPassword, resetPassword, signin, logout, getUsersList, makeAdmin, authorizeLogin } = require('../controller/userController')
const { userCheck, validate } = require('../validation')
const router = require('express').Router()

router.post('/register', userCheck, validate, register)
router.get('/verifyemail/:token', verifyUser)
router.post('/resendverification', resendVerification)
router.post('/forgetpassword', forgetPassword)
router.post('/resetpassword/:token', resetPassword)
router.post('/login', signin)
router.get("/logout",logout)

router.get('/userlist', authorizeLogin, getUsersList)
router.post("/makeAdmin", makeAdmin)



module.exports = router