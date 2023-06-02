const User = require("../models/user.model");
const Cart = require("../models/cart.model");
const Order = require("../models/order.model");
const Product = require("../models/product.model");
const { calculateCartTotal } = require("../config/total");
//Get User Cart
const getCart = async (req, res) => {
  try {
    let cart = await Cart.find({ userId: req.user_id });
    if (cart.length == 0) throw new Error("not have cart");

    // // calculat total price and total amount
    // let totalprice = 0;
    // let totalamount = 0;
    // for (i = 0; i < cart.length; i++) {
    //   var cartitem = cart[i];
    //   console.log(cartitem.price);
    //   totalprice += parseInt(cartitem.price);
    //   totalamount += cartitem.amount;
    // }
    const { totalprice, totalamount } = calculateCartTotal(cart);
    res.status(200).json({
      cart: cart,
      totalprice,
      totalamount,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      error: error.message,
    });
  }
};

// add new item and cart

// const addCart = async (req, res) => {
//   try {
//     let amount = req.body.amount;
//     if (amount < 1) throw new Error("Please enter amount greter than 0");
//     let prodect = await Product.findById({ _id: req.body.productId });
//     var price = prodect.price;
//     let productCart = await Cart.find({ productId: req.body.productId });
//     let usercart = await Cart.find({ userId: req.user_id });
//     if (usercart.userId) {
//       const newAmount = productCart[0].amount + 1;
//       const newprice = price * newAmount;
//       await Cart.findOneAndUpdate(
//         { productId: req.body.productId },
//         { amount: newAmount, price: newprice }
//       );
//       res.status(200).json({
//         message: "Product Added Succesfully",
//         product_name: prodect.productName,
//       });
//     } else {
//       const { name, price, amount, productId } = req.body;
//       const userId = req.user_id;
//       if (!name || !price || !amount || !userId || !productId)
//         throw new Error("Please enter all fild");
//       let newItem = new Cart({
//         name,
//         price,
//         amount,
//         userId: userId,
//         productId,
//       });
//       await newItem.save();
//       res.status(200).json({
//         message: "Product Added Succesfully To Cart",
//       });
//     }
//   } catch (error) {
//     console.log(error.message);
//     res.status("400").json({
//       error: error.message,
//     });
//   }
// };

const addCart = async (req, res) => {
  try {
    let  product = await Product.findById({ _id: req.body.productId });
    if (!product) throw new Error("Product not found");
    let  cart = await Cart.findOne({ userId: req.user_id });
    let productCart = await Cart.findOne({ productId: req.body.productId });
    if (!cart || !productCart) {
      const newCart = new Cart({
        name: product.productName,
        price: product.price,
        amount: 1,
        userId: req.user_id,
        productId: product._id,
      });
      await newCart.save();
      res.status(200).json({
        ok: true,
        message: "product added to cart successfully",
      });
    }
    if (productCart) {
      const amount = productCart.amount + 1;
      const price = amount * product.price;
      await Cart.findOneAndUpdate(
        { productId: req.body.productId },
        { price, amount }
      );
      res.status(200).json({
        ok: true,
        message: "add",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: error.message,
    });
  }
};

//Edit Item

const editItem = async (req, res) => {
  try {
    let prodect = await Product.findById({ _id: req.body.productId });
    let newAmount = req.body.amount;
    let newprice = prodect.price * newAmount;
    let item = await Cart.findOneAndUpdate(
      { productId: req.body.productId },
      {
        amount: newAmount,
        price: newprice,
      }
    );
    if (!item) throw new Error("not found update");
    res.status(200).json({
      message: "updates Successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      error: error.message,
    });
  }
};

//Delete CartItem
const deleteItem = async (req, res, nxt) => {
  try {
    let item = await Cart.findOneAndDelete({
      productId: req.params.productId,
    }).exec();
    if (!item) throw new Error("can not foun delete");
    res.status(200).json({
      message: "Delete Successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      error: error.message,
    });
  }
};

//Delete Cart

const deletcart = async (req, res) => {
  try {
    let cart = await Cart.deleteMany({ userId: req.user_id }).exec();
    if (!cart) throw new Error("not found cart");
    res.status(200).json({
      message: "Delete All successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      error: error.message,
    });
  }
};

//save Cart to Order
const saveOreder = async (req, res) => {
  try {
    let user = await User.findById({ _id: req.user_id });
    if (!user.email || !user.address)
      throw new Error("please update your profile");
    let userCart = await Cart.find({ userId: req.user_id });
    if(!userCart) throw new Error("not have order in cart")
    const { totalprice, totalamount } = calculateCartTotal(userCart);
    console.log(totalprice);
    let order = new Order({
      email: user.email,
      address: user.address,
      cart: userCart,
      orderId: user._id,
      totalprice,
      totalamount,
    });
    await order.save();
    await Cart.deleteMany({ userId: req.user_id }).exec();
    res.status(200).json({
      message: "Saved Order Successfully",
      orderid: order,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = {
  addCart,
  getCart,
  editItem,
  deleteItem,
  deletcart,
  saveOreder,
};
