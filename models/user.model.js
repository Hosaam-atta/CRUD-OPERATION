const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
        trim: true
    },

    lastName: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,

        validate: {
            validator: validator.isEmail,
            message: "Please enter a valid email"
        }
    },

    password: {
        type: String,
        required: true,
        minlength: [8, "Password must be at least 8 characters"],
        
    },
    token:{
        type:"String"
    }

});

module.exports = mongoose.model("user" , userSchema)

