const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstname:{ type:String },
    lastname:{ type:String  },
    email :{ type:String },
    password : { type:String },
    confirmPassword : { type:String},
    phoneNo:{ type:String  },
    otpValidation:{
        type:Number,default:0
    }
});

const userRegModel = mongoose.model("EmployeeRegDetails",userSchema,"userDetails");

module.exports = userRegModel; 