const mongoose = require('mongoose')
const Schema = mongoose.Schema

const customerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    provider: {
        type: String,
        required: true
    },
    googleId: {
        type: String,
        required: true
    }
},{timestamps: true})

const Customers = mongoose.model('Customers',customerSchema)
module.exports = Customers