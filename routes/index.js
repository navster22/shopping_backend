const express = require('express')
const { createUser,loginUser, getUsers, validateEmail, validateOtp, resetpassword } = require('../contollers/userController')
const passport = require('passport')
const multer = require("multer")
const { addBanner, getBanners, updateBanner, deleteBanner } = require('../contollers/bannerController')
const { updateProduct, getProducts, addProduct } = require('../contollers/productController')

const router = express.Router()

const cartRoutes = require('./cartRoutes')
const googleAuthRoutes = require('./googleLoginRoutes')
const orderRoutes = require('./orderRoutes')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix+file.originalname.trim())
    }
})

const upload = multer({ storage })

router.post('/create-user',createUser)

router.post('/login-user',loginUser)

router.get('/get-users', passport.authenticate('jwt', {session: false}),getUsers)

router.post('/add-banner', passport.authenticate('jwt', {session: false}), addBanner)

router.get('/get-banners',getBanners)

router.get('/get-banner/:bannerId',getBanners)

router.delete('/delete-banner/:bannerId', passport.authenticate('jwt', {session: false}),deleteBanner)

router.put('/update-banner/:bannerId', passport.authenticate('jwt', {session: false}),updateBanner)

router.post('/add-product', passport.authenticate('jwt', {session: false}),addProduct)

router.get('/get-products',getProducts)

router.get('/validate-email',validateEmail)

router.get('/validate-otp',validateOtp)

router.post('/reset-password',resetpassword)

router.get('/get-product/:productId',getProducts)

router.put('/update-product/:productId', passport.authenticate('jwt', {session: false}),updateProduct)

router.post('/upload', passport.authenticate('jwt', {session: false}), upload.single('banner'),(req, res) => {
    console.log(req.file)
    return res.status(201).json({
        statusCode: 201,
        message: 'File uploaded successfully',
        data: `${process.env.BASE_URL}/files/${req.file.filename}`
    })
})

router.post('/upload-product-images', passport.authenticate('jwt', {session: false}), upload.any('productImages'),(req, res) => {
    console.log(req.files)
    let uploadedProductImages = {}
    req.files.forEach((item,index) => {
        uploadedProductImages[`productImage${index}`] = `${process.env.BASE_URL}/files/${item.filename}`
    })
    return res.status(201).json({
        statusCode: 201,
        message: 'Product images uploaded successfully',
        data: uploadedProductImages
    })
})


router.use(cartRoutes)
router.use(googleAuthRoutes)
router.use(orderRoutes)

module.exports = router