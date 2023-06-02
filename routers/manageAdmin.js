const express = require("express");
const { isAdmin } = require("../middlewares/authMWPermission");
const {
  addAddmin,
  deleteAdmin,
} = require("../controllers/manageAdminController");
const router = express.Router();

router
  .put("/addadmin", isAdmin, addAddmin)
  .put("/deleteadmin", isAdmin, deleteAdmin);

module.exports = router;
