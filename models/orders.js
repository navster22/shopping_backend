const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    customerId: {
        type: String,
        required: true,
        default: 'dummy'
    },
    items: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Products'
            }
        }
    ],
    orderValue: {
        type: Number,
        required: true
    },
    razorpay_order_id: {
        type: String,
        required: true
    },
    razorpay_payment_id: {
        type: String,
        required: true
    },
    razorpay_signature: {
        type: String,
        required: true
    },
},{timestamps: true})

const Orders = mongoose.model('Orders',orderSchema)
module.exports = Orders