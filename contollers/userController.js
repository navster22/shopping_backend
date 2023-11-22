const Users = require('../models/users')
const md5 = require('md5')
const jwt = require('jsonwebtoken')
const { sendOtp } = require('../mailerService')
const Otps = require('../models/otps')

const createUser = async (req,res) => {
    try{
        console.log('Log for createUser:',req.body)
        const user = await Users.findOne({email: req.body.email})
        if(user) {
            console.log(user)
            return res.status(200).json({
                statusCode: 200,
                message: 'Email already exists'
            })
        }
        console.log('No user found')
        req.body.password = md5(req.body.password)
        const newUser = new Users(req.body)
        newUser.save()
        .then(result => {
            return res.status(201).json({
                statusCode: 201,
                message: 'User created successfully'
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

const loginUser = async (req,res) => {
    try {
        console.log('Log for loginUser:',req.body)
        const user = await Users.findOne({email: req.body.email})
        if(!user) {
            console.log(user)
            return res.status(404).json({
                statusCode: 404,
                message: 'User not found'
            })
        }
        if(req.body.email === user.email && md5(req.body.password) === user.password) {
            console.log('Ran till here')
            const payload = {
                username: user.name,
                id: user._id
            }
            const token = jwt.sign(payload, process.env.JWT_KEY,{expiresIn: "1d"})
            res.cookie('token', token);
            return res.status(200).json({
                statusCode: 200,
                message: 'User login successful'
            })
        }
        return res.status(403).json({
            statusCode: 403,
            message: 'Incorrect password',
        })
    }
    catch {
        return res.status(503).json({
            statusCode: 503,
            message: 'Server error'
        })
    }
}

const getUsers = async (req,res) => {
    try {
        Users.find()
        .then(result => {
            return res.status(200).json({
                statusCode: 200,
                message: 'Success',
                data: result
            })
        })
        .catch((err)=>{
            console.log(err)
            return res.status(400).json({
                statusCode: 400,
                message: ''
            })
        })
    }
    catch {
        return res.status(503).json({
            statusCode: 503,
            message: 'Server error'
        })
    }
}

const validateEmail = async (req,res) => {
    try {
        console.log('Log for validateEmail:', req.query.email)
        if(!req.query.email) {
            return res.status(400).json({
                statusCode: 400,
                message: 'Invalid request'
            })
        }
        await Users.findOne({email: req.query.email})
        .then(async result => {
            if(result) {
                const otp = Math.floor(1000 + Math.random() * 9000)
                const mailerRes = await sendOtp(req.query.email, otp)
                console.log('Here is the response from mailer service', mailerRes)
                return res.status(200).json({
                    statusCode: 200,
                    message: 'Otp is sent successfully. Please check your email.',
                    isValid: true
                })
            }
            return res.status(404).json({
                statusCode: 404,
                message: 'This email is not registered with us.',
                isValid: false
            })
        })
        .catch((err)=>{
            console.log(err)
            return res.status(400).json({
                statusCode: 400,
                message: 'Bad request'
            })
        })
    }
    catch {
        return res.status(503).json({
            statusCode: 503,
            message: 'Server error'
        })
    }
}

const validateOtp  = async (req, res) => {
    try{
        console.log('Log for validateOtp:', req.query.email, req.query.otp)
        if(!req.query.email || !req.query.otp) {
            return res.status(400).json({
                statusCode: 400,
                message: 'Invalid request. OTP and email must present.'
            })
        }
        Otps.findOne({email: req.query.email, otpValue: req.query.otp, isValid: true})
        .then(async result => {
            if(!result){
                return res.status(404).json({
                    statusCode: 404,
                    message: 'Invalid OTP',
                })
            }
            const updateOtpResult = await updateOtp(result._id)
            console.log(updateOtpResult)
            if(updateOtpResult.validOtp) {
                res.status(200).json(updateOtpResult)
            } else {
                res.status(400).json(updateOtpResult)
            }
        })
        .catch(err => {
            console.log(err)
            return res.status(400).json({
                statusCode: 400,
                message: 'Bad request'
            })
        })
    }
    catch(err) {
        return res.status(503).json({
            statusCode: 503,
            message: 'Server error'
        })
    }
}

const updateOtp = async (_id) => {
    const result = await Otps.findOneAndUpdate({_id}, {isValid: false})
    .then( updateResult => {
        return {
            statusCode: 200,
            message: 'Otp is validated',
            validOtp: true
        }
    })
    .catch( updateErr => {
        return {
            statusCode: 400,
            message: 'Unable to validate OTP at this moment. Please try again later.',
            validOtp: false
        }
    })
    return result;
}

const resetpassword = async (req, res) =>{
    try{
        console.log('Log for resetpassword:',req.body)
        Users.findOneAndUpdate({email: req.body.email},{password: md5(req.body.password)})
        .then(result => {
            return res.status(200).json({
                statusCode: 200,
                message: 'Password updated successfully'
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
    createUser,
    loginUser,
    getUsers,
    validateEmail,
    validateOtp,
    resetpassword
}