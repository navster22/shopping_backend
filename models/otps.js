const mongoose = require('mongoose')
const Schema = mongoose.Schema

const otpSchema = new Schema({
    otpValue: {
        type: String,
        required: true
    },
    isValid: {
        type: Boolean,
        required: true,
        default: true
    },
    email: {
        type: String,
        required: true
    }
},{timestamps: true})

const Otps = mongoose.model('Otps',otpSchema)
module.exports = Otps