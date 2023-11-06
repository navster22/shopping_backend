const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bannerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    bannerImageLink: {
        type: String,
        required: true
    },
    productLink: {
        type: String,
        required: true
    }
},{timestamps: true})

const Banners = mongoose.model('Banners',bannerSchema)
module.exports = Banners