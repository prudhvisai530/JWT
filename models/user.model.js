const mongoose = require('mongoose');
const {isEmail} = require('validator');

const userSchema = mongoose.Schema({
    email: {
        type:String,
        required: [true, "email is required"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Enter a valid email address"]

    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength:[6, 'minimum 6 characters are required']
    }
});


const User = mongoose.model('user', userSchema);

module.exports = User