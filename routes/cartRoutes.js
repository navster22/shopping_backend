const express = require('express')
const { addToCart, getCartProducts, deleteCartProduct } = require('../contollers/cartController')

const router = express.Router()

router.get('/add-to-cart',addToCart)

router.get('/fetch-cart',getCartProducts)

router.get('/remove-from-cart',deleteCartProduct)


module.exports = router