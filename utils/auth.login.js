const Ajv = require("ajv").default
const ajv = new Ajv()

const Schema = {
    "type":"object",
    "properties":{
        
        "email":{"type":"string","pattern":".+\@.+\..+"},
        "password":{"type":"string","minLength":5,"maxLength":30},
       
    },
    "required":["email","password"]
}


module.exports= ajv.compile(Schema)
