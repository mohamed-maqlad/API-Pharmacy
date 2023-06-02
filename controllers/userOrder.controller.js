const Order = require("../models/order.model");

const getorder = async (req, res) => {
  try {
      let order = await Order.find({ orderId: req.user_id });
    //   console.log(order.email[1]);
    if (order.length == 0) throw new Error("Not Found User Order");
      res.status(200).json({
        order: order,
      });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = {
  getorder,
};
