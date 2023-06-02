const vladatorSignup = require("../utils/auth.signup")
const validtorSigin = require("../utils/auth.login")
let signupValid= async(req,res,nxt)=>{
    try {
        let valid = await vladatorSignup (req.body)
        if(!valid) throw new Error("Enter correct pattern")
        nxt()
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            error:error.message
        })
    }
}


let siginValid = async(req,res,nxt)=>{
    try {
        let valid = await validtorSigin (req.body)
        if(!valid) throw new Error("Enter correct user name or password")
        nxt()
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            error:error.message
        })
    }
}


module.exports ={
    signupValid,
    siginValid,
}

