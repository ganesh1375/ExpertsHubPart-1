const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstname:{ type:String, required:true },
    lastname:{ type:String, required:true  },
    email :{ type:String, required:true  },
    password : { type:String, required:true  },
    confirmPassword : { type:String},
    phoneNo:{ type:String  },
    otpValidation:{
        type:Number,default:0
    }
});

const userRegModel = mongoose.model("EmployeeRegDetails",userSchema,"userDetails");

module.exports = userRegModel; 