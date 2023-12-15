const Carts = require("../models/carts")
const mongoose = require('mongoose')

const addToCart = async (req,res) => {
    try{
        console.log('Log for addToCart:',req.body)

        let cart = await Carts.findOne({customerId: req.body.customerId})


        req.body.productId = new mongoose.Types.ObjectId(req.body.productId)

        if(!cart) {
            cart = new Carts({customerId: req.body.customerId, items: [{productId: req.body.productId}]})
        } else {
            const existedInCart = cart.items.find(item => item.productId === req.body.productId)
            if(!existedInCart) {
                cart.items.push({productId: req.body.productId})
            } else {
                return res.status(200).json({
                    statusCode: 200,
                    message: 'Product already present in cart'
                })
            }
        }

        await cart.save()
        .then(async result => {
            console.log(result)
            return res.status(200).json({
                statusCode: 200,
                message: 'Product added to cart successfully'
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

const getCartProducts = async (req,res) => {
    try{
        console.log('Log for getCartProducts:',req.params)
        Carts.findOne({customerId: req.params.customerId}).populate({path: 'items.productId', modal: 'Products'})
        .then(result => {
            console.log(result)
            return res.status(200).json({
                statusCode: 200,
                message: 'Cart products fetched successfully',
                data: result ? result : []
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

const deleteCartProduct = async (req,res) => {
    try{
        console.log('Log for deleteCartProduct:',req.body)

        let cart = await Carts.findOne({customerId: req.body.customerId})

        // req.body.productId = new mongoose.Types.ObjectId(req.body.productId)

        console.log('Log for deleteCartProduct:',req.body)

        if(cart) {
            cart.items = cart.items.filter(item => item.productId.toString() !== req.body.productId)
            console.log(cart)
            await cart.save()
            .then(result => {
                return res.status(200).json({
                    statusCode: 200,
                    message: 'Product deleted successfully from cart'
                })
            })
            .catch(err => {
                return res.status(400).json({
                    statusCode: 400,
                    message: 'Bad request'
                })
            }
            ) 
        } else {
            return res.status(200).json({
                statusCode: 200,
                message: 'Product is not present in cart'
            })
        }

    }
    catch{
        return res.status(503).json({
            statusCode: 503,
            message: 'Server error'
        })
    }
} 

module.exports = {
    addToCart,
    getCartProducts,
    deleteCartProduct
}