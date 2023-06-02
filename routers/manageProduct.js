const express = require("express");
const { isAdmin } = require("../middlewares/authMWPermission");
const {
  editproduct,
  deleteProduct,
  upload,
  addProduct,
} = require("../controllers/manageProduct.controller");
const router = express.Router();

router
  .post("/", isAdmin, upload.single("image"), addProduct)
  .put("/", isAdmin, editproduct)
  .delete("/", isAdmin, deleteProduct);

module.exports = router;
