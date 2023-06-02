const express =require('express')
const router = express.Router()
const authController = require("../controllers/auth.controller")
const valid = require("../middlewares/authMWValidator")
router
.post("/",valid.signupValid,authController.signUP)
    .post("/sigin", valid.siginValid, authController.signin)

module.exports = router;