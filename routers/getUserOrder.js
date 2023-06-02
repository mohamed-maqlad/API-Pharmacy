const express = require("express")
const { isUser } = require('../middlewares/authMWPermission')
const {getorder} = require("../controllers/userOrder.controller")
const router = express.Router()

router.get("/", isUser,getorder);

module.exports = router;