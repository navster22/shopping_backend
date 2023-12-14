const Carts = require("../models/carts")
const Orders = require("../models/orders")
const mongoose = require('mongoose')

const createOrderFromCart = async (req,res) => {
    try{
        console.log('Log for createOrderFromCart:',req.body)

        let cart = await Carts.findOne({customerId: req.body.customerId})

        const order = new Orders({
            customerId: req.body.customerId,
            items: cart.items.map(item => ({productId: item.productId})),
            orderValue: req.body.total
        })

        await order.save()
        .then(result => {
            console.log(result)
            return res.status(200).json({
                statusCode: 200,
                message: 'Order created for cart successfully'
            })
        })
        .catch(err => {
            console.log(err)

            return res.status(400).json({
                statusCode: 400,
                message: 'Bad request'
            })
        }
        )
    }
    catch{
        return res.status(503).json({
            statusCode: 503,
            message: 'Server error'
        })
    }
}

const getOrders = async (req,res) => {
    try{
        console.log('Log for getOrders:',req.params)
        Orders.find({customerId: req.params.customerId}).populate({path: 'items.productId', modal: 'Products'})
        .then(result => {
            console.log(result)
            return res.status(200).json({
                statusCode: 200,
                message: 'Orders fetched successfully',
                data: result
            })
        })
        .catch(err => {
            return res.status(400).json({
                statusCode: 400,
                message: 'Bad request'
            })
        }
        )
    }
    catch{
        return res.status(503).json({
            statusCode: 503,
            message: 'Server error'
        })
    }
}

const buyNowOrder = async (req,res) => {
    try{
        console.log('Log for buyNowOrder:',req.body)

        const order = new Orders({
            customerId: req.body.customerId,
            items: [{productId: req.body.productId}],
            orderValue: req.body.total
        })

        await order.save()
        .then(result => {
            console.log(result)
            return res.status(200).json({
                statusCode: 200,
                message: 'Order created successfully'
            })
        })
        .catch(err => {
            console.log(err)

            return res.status(400).json({
                statusCode: 400,
                message: 'Bad request'
            })
        })
    } 
    catch{
        return res.status(503).json({
            statusCode: 503,
            message: 'Server error'
        })
    }
} 

module.exports = {
    createOrderFromCart,
    getOrders,
    buyNowOrder
}