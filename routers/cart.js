const express = require("express");
const { isUser } = require("../middlewares/authMWPermission");
const {
  addCart,
  getCart,
  editItem,
  deleteItem,
  deletcart,
  saveOreder,
} = require("../controllers/cart.controller");
const router = express.Router();

router
  .get("/", isUser, getCart)
  .post("/", isUser, addCart)
  .put("/edit", isUser, editItem)
  .delete("/delete/:productId", isUser, deleteItem)
  .delete("/deletall", isUser, deletcart)
  .post("/saveorder", isUser, saveOreder);

module.exports = router;
