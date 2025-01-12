const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
     password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone_no: {
        type: String,
        required: true
    },
   
    profilepic: {
        type: String,
        required: true
    },

    })

const User = mongoose.model('Users', UserSchema)
module.exports = User;