const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
    customerId: {
        type: String,
        required: false
    },
    productId: {
        type: String,
        required: true
    }
},{timestamps: true})

const Carts = mongoose.model('Carts',cartSchema)
module.exports = Carts