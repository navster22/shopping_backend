const Products = require('../models/products')

const addProduct = async (req,res) => {
    try{
        console.log('Log for addProduct:',req.body)
        const newProduct = new Products(req.body)
        newProduct.save()
        .then(result => {
            return res.status(201).json({
                statusCode: 201,
                message: 'Product added successfully'
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

const getProducts = async (req,res) => {
    try{
        console.log('Log for getProducts:',req.body)
        Products.find()
        .then(result => {
            return res.status(200).json({
                statusCode: 200,
                message: 'Products fetched successfully',
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

const updateProduct = async (req,res) => {
    try{
        console.log('Log for updateProduct:',req.body)
        const productId = req.params.productId
        Products.findOneAndUpdate({_id: productId},req.body)
        .then(result => {
            return res.status(200).json({
                statusCode: 200,
                message: 'Product updated successfully'
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
    addProduct,
    getProducts,
    updateProduct
}