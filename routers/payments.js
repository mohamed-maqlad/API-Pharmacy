const express = require("express")
const { isUser } = require("../middlewares/authMWPermission")
const {
  processPayment,
  createVodafoneCashPaymentIntent,
} = require("../controllers/payment.controller");
const router = express.Router()


router
  .post("/card", isUser, processPayment)

module.exports = router;