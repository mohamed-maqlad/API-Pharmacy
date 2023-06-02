const multer = require("multer");
const path = require("path");
const Product = require("../models/product.model");

//add new product 
// configure multer to store uploaded files in the 'images' directory
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../images"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Initialize Multer
const upload = multer({ storage: storage });

// Define the product add function
const addProduct = async (req, res) => {
  try {
    const { productName, price, description } = req.body;
    const image = req.file.filename;
    const newProduct = new Product({
      productName,
      price,
      description,
      image,
    });
      
    await newProduct.save();
    // Return the product information to the client
    res.status(200).json({ ok: true, newProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, error: error.message });
  }
};



// update Product
const editproduct = async (req, res) => {
  try {
    const { productName, price, description } = req.body;
    if (!productName || !price || !description)
      throw new Error("Please Enter All Field");
    let product = await Product.findByIdAndUpdate(
      { _id: req.body.id },
      { productName, price, description }
    );
    if (!product) throw new Error("not found product to update")
      res.status(200).json({
        message: "Product Updated Successfully",
        product: product,
      });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      error: error.message,
    });
  }
};

//delete product

const deleteProduct = async (req, res) => {
  try {
    let product = await Product.findByIdAndDelete({ _id: req.body.id });
    if (!product) throw new Error("NOt Found Product");
    res.status(200).json({
      message: "deleted Successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = {
  editproduct,
  deleteProduct,
  upload,
  addProduct,
};
