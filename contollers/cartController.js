const Carts = require("../models/carts")

const addToCart = async (req,res) => {
    try{
        console.log('Log for addToCart:',req.query)
        const newCartProduct = new Carts({productId: req.query.productId})
        newCartProduct.save()
        .then(result => {
            return res.status(201).json({
                statusCode: 201,
                message: 'Product added to cart successfully'
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

const getCartProducts = async (req,res) => {
    try{
        console.log('Log for getCartProducts:',req.body)
        Carts.find()
        .then(result => {
            return res.status(200).json({
                statusCode: 200,
                message: 'Cart products fetched successfully',
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

const deleteCartProduct = async (req,res) => {
    try{
        console.log('Log for deleteCartProduct:',req.params)
        const cartProductId = req.params.cartProductId
        Carts.findOneAndRemove({_id: cartProductId})
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