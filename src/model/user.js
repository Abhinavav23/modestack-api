const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    tokens:{
        type: String,
    }

})

userSchema.methods.generateAuthToken =  async function(){
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRETKEY)
    user.tokens = token
    return token
} 

userSchema.statics.findByCredentials = async (username, password) => {
    const user = await User.findOne({"username": username})
    if(!user){
        throw new Error('unable to login without user')
    }
    const isValid = await bcrypt.compare(password, user.password)
    if(!isValid){
        throw new Error('unable to login')
    }
    return user
}

userSchema.pre('save', async function (next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})
const User = mongoose.model('User', userSchema)
module.exports = User