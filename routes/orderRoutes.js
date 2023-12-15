const express = require('express')
const { createOrderFromCart, buyNowOrder, getOrders } = require('../contollers/orderController')
const Razorpay = require('razorpay');
var instance = new Razorpay({ 
      key_id: '',
      key_secret: ''
})

const router = express.Router()

router.post('/order-from-cart',createOrderFromCart)

router.post('/buy-now-order',buyNowOrder)

router.get('/fetch-order/:customerId',getOrders)

router.post('/create-order-id',(req, res) => {
    var options = {
        amount: parseInt(req.body.total) * 100,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
    };
    instance.orders.create(options, function(err, order) {
     console.log(order);
     return res.status(201).json({
        statusCode: 201,
        message: 'Order id created successfully',
        orderId: order.id
    })
    });
})



module.exports = router