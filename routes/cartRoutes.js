const express = require('express')
const { addToCart, getCartProducts, deleteCartProduct } = require('../contollers/cartController')
const { isAuthenticatedCustomer } = require('../passport')

const router = express.Router()

router.post('/add-to-cart',addToCart)

router.get('/fetch-cart/:customerId', isAuthenticatedCustomer, getCartProducts)

router.post('/remove-from-cart',deleteCartProduct)


module.exports = router