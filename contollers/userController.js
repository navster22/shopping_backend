const Users = require('../models/users')
const md5 = require('md5')
const jwt = require('jsonwebtoken')

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
  
module.exports = {
    createUser,
    loginUser,
    getUsers
}