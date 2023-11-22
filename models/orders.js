const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    customerId: {
        type: String,
        required: true
    },
    products: {
        type: Array,
        required: true
    }
},{timestamps: true})

const Orders = mongoose.model('Orders',orderSchema)
module.exports = Orders