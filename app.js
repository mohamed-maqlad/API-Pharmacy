const express = require("express");
const mongoose = require("mongoose");
const path = require("path")
const cors = require('cors');
require("dotenv").config();


const authRouter = require("./routers/auth")
const homeRouter = require("./routers/home")
const manageAdminRouter = require("./routers/manageAdmin")
const cartRouter = require("./routers/cart")
const manageOrderRouter = require("./routers/manageOrder")
const editProfileRouter = require("./routers/editProfile")
const manageProductRouter = require("./routers/manageProduct")
const userOrderRouter = require("./routers/getUserOrder")
const paymentsRouter = require("./routers/payments")
const addProductRouter = require("./routers/addProduct")

const port = process.env.port;
const DB_URI = process.env.DB_URI;

(async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("Database Connected Successfully...");
  } catch (error) {
    console.log(error.message);
    process.exit(4);
  }
  const app = express()
    .use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(express.static(path.join(__dirname, "images")))
    .use("/", homeRouter)
    .use("/", addProductRouter)
    .use("/api/user", authRouter)
    .use("/api/admin", manageAdminRouter)
    .use("/api/cart", cartRouter)
    .use("/api/manageorder", manageOrderRouter)
    .use("/api/profile", editProfileRouter)
    .use("/api/manageproduct", manageProductRouter)
    .use("/api/userorder", userOrderRouter)
    .use("/api/payments", paymentsRouter)
    .listen(port, () => console.log(`Server Is Listening : ${port}`));
})();
