const express = require('express')
const { createOrderFromCart, buyNowOrder, getOrders } = require('../contollers/orderController')

const router = express.Router()

router.post('/order-from-cart',createOrderFromCart)

router.post('/buy-now-order',buyNowOrder)

router.get('/fetch-order/:customerId',getOrders)



module.exports = router