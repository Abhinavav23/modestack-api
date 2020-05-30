const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    access_token: {
        type: String
    }
})

const article = new mongoose.model('article', articleSchema)
module.exports = article
