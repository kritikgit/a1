const mongoose = require("mongoose");

const Schema = mongoose.Schema

const userSchema =new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        minlength: 10,
        unique : true,
        maxlength: 15,
    },
    password: {
        type: String,
    },

})



const user = mongoose.model('user', userSchema);

module.exports = user
