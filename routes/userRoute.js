const { register, verifyUser, resendVerification, forgetPassword, resetPassword, signin, logout, getUsersList, makeAdmin, authorizeLogin, changeRole } = require('../controller/userController')
const { userCheck, validate } = require('../validation')
const router = require('express').Router()

router.post('/register', userCheck, validate, register)
router.get('/verifyemail/:token', verifyUser)
router.post('/resendverification', resendVerification)
router.post('/forgetpassword', forgetPassword)
router.post('/resetpassword/:token', resetPassword)
router.post('/login', signin)
router.get("/logout",logout)

router.get('/userlist', getUsersList)
router.post("/makeAdmin", makeAdmin)
router.put('/changerole/:id',changeRole)


module.exports = router