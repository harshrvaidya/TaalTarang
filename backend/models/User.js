const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
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

UserSchema.methods.generateToken = async function () { // methods is thing which allows to craete fucntios
    try {// genratetoken is a user defied fucntion and these methods can be used in the repesctove controllers 
        return jwt.sign({ 
            userId: this._id.toString(),
            email: this.email
        },process.env.JWT_SECRET_KEY,{expiresIn:"1d"});// "this" has all data
    }
    catch {
        console.error(error)
    }

}

const User = mongoose.model('Users', UserSchema)
module.exports = User;