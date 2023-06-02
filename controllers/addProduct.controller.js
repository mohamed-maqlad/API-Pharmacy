const multer = require("multer");
const path = require("path");
const Product = require("../models/product.model");

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
    const product = new Product({
      productName,
      price,
      description,
      image,
    });
      
    await product.save();
    // Return the product information to the client
    res.status(200).json({ ok: true, product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, error: error.message });
  }
};

module.exports = {
  upload,
  addProduct,
};
