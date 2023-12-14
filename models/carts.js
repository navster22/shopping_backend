const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
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
    ]
},{timestamps: true})

const Carts = mongoose.model('Carts',cartSchema)
module.exports = Carts