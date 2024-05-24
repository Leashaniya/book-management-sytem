const mongoose=require("mongoose");
const { default: isEmail } = require("validator/lib/isEmail");
const Schema =mongoose.Schema;

const userSchema= new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [isEmail, "Please enter a valid email"],
      },
      password: {
        type: String,
        required: true
      },
      Id: {
        type: String,
        required: true,
      },
    });

const User=mongoose.model("User",userSchema);
module.exports=User;