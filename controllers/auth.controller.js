const user_db = require("../models/user.model")
const bcrypt = require("bcrypt")

const signUP = async(req,res,nxt)=>{
    try {
        let user = await user_db.findOne({email:req.body.email})
        if(user) throw new Error("User Already Exist!")
        const hashPassword = await bcrypt.hash(req.body.password, 10)
        const { name, email } = req.body;
        let newUser = new user_db({
          name,
          email,
          password: hashPassword,
        });
        await newUser.save()
        res.status(200).json({
          ok: true,
          message: "User Saved Successfully",
          token: newUser.getAuthToken(),
        });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            ok:false,
            error:error.message
        })
    }
}

const signin = async(req,res)=>{
    try {
        let user = await user_db.findOne({email:req.body.email})
        if(!user) throw new Error("This user dont have account")
        let validPassword = await bcrypt.compare(req.body.password,user.password)
        if(!validPassword) throw new Error("Invalid password")
        res.status(200).json({
          ok: true,
          message: "login Successfully",
          token: user.getAuthToken(),
        });

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            ok:false,
           error: error.message
        })
    }
}



module.exports = {
  signUP,
  signin,
};