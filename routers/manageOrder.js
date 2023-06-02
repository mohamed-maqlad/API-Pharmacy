const express = require("express");
const { isAdmin } = require("../middlewares/authMWPermission")
const {
  getOrder,
  update,
  findStatus,
  searchOreder,
} = require("../controllers/manageOrder.controller");
const router = express.Router()


router
  .get("/", isAdmin, getOrder)
  .put("/", isAdmin, update)
  .get("/find", isAdmin, findStatus)
  .get("/search", isAdmin, searchOreder);
module.exports = router;