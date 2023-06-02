const express = require("express")
const { isUser } = require("../middlewares/authMWPermission")
const {
  getProfile,
  editProfile,
  upload,
} = require("../controllers/editProfile.controller");
const router = express.Router()


router
  .get("/", isUser, getProfile)
  .put("/update", isUser, upload.single("image"), editProfile);

module.exports = router;