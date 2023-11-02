const Users = require('../models/users')
const md5 = require('md5')

const createUser = async (req,res) => {
    try{
        console.log(req.body)
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

module.exports = {
    createUser
}