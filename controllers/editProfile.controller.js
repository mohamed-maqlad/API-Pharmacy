const multer = require("multer");
const path = require("path");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");


//get user profile
const getProfile = async (req, res) => {
  try {
    let user = await User.findById({ _id: req.user_id });
    if (!user) throw new Error("NOt Found Profile");
    res.status(200).json({
      user: user,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      error: error.message,
    });
  }
};


// edit user profile
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
const editProfile = async (req, res) => {
  try {
    const password = req.body.password;
    const passwordhas = await bcrypt.hash(password, 10);
    const image = req.file.filename
    const { name, email, contact, address } = req.body;
    if (!name || !email || !contact || !address || !image)
      throw new Error("Please Enter All Fild");
    let user = await User.findByIdAndUpdate(
      { _id: req.user_id },
      {
        name,
        email,
        contact,
        address,
        password: passwordhas,
        image,
      }
    );
    if (!user) throw new Error("Cant Update User Profile");
    res.status(200).json({
      message: "Updated Profile Successfully",
      name: user.name
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      error: error.message,
    });
  }
};


module.exports = {
  getProfile,
  editProfile,
  upload,
};
