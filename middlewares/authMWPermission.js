const jwt = require("jsonwebtoken");
require("dotenv").config();

const isUser = (req, res, next) => {
  try {
    if (!req.headers.authorization) throw new Error("not found token");
    const token = req.headers.authorization.split(" ")[1];
    // const token = req.body.token;
    // console.log(token);
    const secKey = process.env.JWT_SEC;
    if (!token) throw new Error("access denied!!");
    const decodedPayLoad = jwt.verify(token, secKey);
    if (!decodedPayLoad.userid) throw new Error("access denied!");
    req.user_id = decodedPayLoad.userid;
    next();
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      error: error.message,
    });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    if(!req.headers.authorization) throw new Error("not found token")
    const token = req.headers.authorization.split(" ")[1];
    // const token = req.body.token;
    const secKey = process.env.JWT_SEC;
    if (!token) throw new Error("access denied!!");
    const decodedPayLoad = jwt.verify(token, secKey);
    if (!decodedPayLoad.isAdmin) throw new Error("access denied!");
    req.user_id = decodedPayLoad.userid;
    next();
  } catch (error) {
    console.log(error.message)
    res.status(400).json({
      error:error.message
    })
  }
}

module.exports = {
  isUser,
  isAdmin,
};