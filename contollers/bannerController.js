const Banners = require('../models/banners')

const addBanner = async (req,res) => {
    try{
        console.log('Log for addBanner:',req.body)
        const newBanner = new Banners(req.body)
        newBanner.save()
        .then(result => {
            return res.status(201).json({
                statusCode: 201,
                message: 'Banner added successfully'
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

const getBanners = async (req,res) => {
    try{
        console.log('Log for getBanners:',req.body)
        Banners.find()
        .then(result => {
            return res.status(200).json({
                statusCode: 200,
                message: 'Banners fetched successfully',
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

const updateBanner = async (req,res) => {
    try{
        console.log('Log for updateBanner:',req.body)
        const bannerId = req.params.bannerId
        Banners.findOneAndUpdate({_id: bannerId},req.body)
        .then(result => {
            return res.status(200).json({
                statusCode: 200,
                message: 'Banner updated successfully'
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

const deleteBanner = async (req,res) => {
    try{
        console.log('Log for deleteBanner:',req.body)
        const bannerId = req.params.bannerId
        Banners.findOneAndRemove({_id: bannerId})
        .then(result => {
            return res.status(200).json({
                statusCode: 200,
                message: 'Banner deleted successfully'
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
    addBanner,
    getBanners,
    updateBanner,
    deleteBanner
}