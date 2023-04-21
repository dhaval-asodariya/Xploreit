const mongoose = require("mongoose");
const newuserSchema = new mongoose.Schema({
    person : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    confirmpassword : {
        type : String,
        required : true
    }
})

// collection 
const Register = new mongoose.model("Register",newuserSchema);
module.exports = Register;