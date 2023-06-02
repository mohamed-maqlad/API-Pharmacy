const express = require("express");
const router = express.Router();
const { upload, addProduct } = require("../controllers/addProduct.controller");

// Define the product add route
router.post(
  "/add-product",
 upload.single("image"),
 addProduct
);

module.exports = router;
