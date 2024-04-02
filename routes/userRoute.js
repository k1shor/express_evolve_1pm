const { register, verifyUser, resendVerification, forgetPassword } = require('../controller/userController')
const router = require('express').Router()

router.post('/register', register)
router.get('/verifyemail/:token', verifyUser)
router.post('/resendverification', resendVerification)
router.post('/forgetpassword', forgetPassword)



module.exports = router