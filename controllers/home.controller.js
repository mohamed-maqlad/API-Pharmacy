const Product = require("../models/product.model");

//Get Home Page

let getHome = async (req, res) => {
  try {
    let products = await Product.find({});
    if (!products) throw new Error("No Products Found");
    res.status(200).json({
      ok: true,
      products: products,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      ok: false,
      error: error.message,
    });
  }
};

// Search Product
const searchProduct = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [{ productName: { $regex: req.query.search, $options: "i" } }],
        }
      : {};

    const product = await Product.find(keyword);
    if(!product) throw new Error("NOt found");
    res.status(200).send(product);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = {
  getHome,
  searchProduct,
};
