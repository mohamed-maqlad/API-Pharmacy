const User = require("../models/user.model");

// add new admin
const addAddmin = async (req, res) => {
  try {
    const trueAdmin = true;
    let newadmin = await User.findOneAndUpdate(
      { email: req.body.email },
      { isAdmin: trueAdmin }
    );
    if (!newadmin) throw new Error("not found user");
    if (newadmin.isAdmin) throw new Error("user already admin");
    res.status(200).json({
      message: "Success Add Admin",
      name: newadmin.name,
      isAdmin: trueAdmin,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      error: error.message,
    });
  }
};

// delete admin
const deleteAdmin = async (req, res) => {
  try {
    const falseAdmin = false;
    let admin = await User.findOneAndUpdate(
      { email: req.body.email },
      { isAdmin: falseAdmin }
    );
    if (!admin) throw new Error("not foud admin email");
    if (admin.isAdmin === false) throw new Error("these user is not admin");
    res.status(200).json({
      message: "Delete Admin successfully",
      name: admin.name,
      isAdmin: falseAdmin,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = {
  addAddmin,
  deleteAdmin,
};
