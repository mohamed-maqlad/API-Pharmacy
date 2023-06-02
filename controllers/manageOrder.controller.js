const Order = require("../models/order.model");

// get order
const getOrder = async (req, res) => {
  try {
    let orders = await Order.find({}).exec();
    if (!orders) throw new Error("Not found Orders");
    res.status(200).json({
      orders: orders,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      error: error.message,
    });
  }
};

//update order
const update = async (req, res) => {
  try {
    let order = await Order.findOneAndUpdate(
      { orderId: req.body.orderid },
      { status: req.body.status }
    );
    if (!order) throw new Error("Not Found Update");
    res.status(200).json({
      message: "Updated Successfuly",
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      error: error.message,
    });
  }
};

//find by status
const findStatus = async (req, res) => {
  try {
    const status = await Order.find({ status: req.body.status });
    if (status.length === 0) throw new Error("Not Found");
    res.status(200).json({
      status: status,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      error: error.message,
    });
  }
};

//Search for order by email

const searchOreder = async (req, res) => {
  try {
    let orders = await Order.find({ email: req.body.email }).exec();
    if (orders.length === 0) throw new Error("not found user order");
    res.status(200).json({
      orders: orders,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = {
  getOrder,
  update,
  findStatus,
  searchOreder,
};
