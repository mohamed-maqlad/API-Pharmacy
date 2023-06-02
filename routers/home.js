const express = require("express");
const router = express.Router();
const { getHome, searchProduct } = require("../controllers/home.controller");
// const { isUser } = require("../middlewares/authMWPermission");
router.get("/", getHome).get("/search", searchProduct);

module.exports = router;
