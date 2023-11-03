const express = require('express')
const { createUser,loginUser, getUsers } = require('../contollers/userController')
const passport = require('passport')

const router = express.Router()

router.post('/create-user',createUser)

router.post('/login-user',loginUser)

router.get('/get-users', passport.authenticate('jwt', {session: false}),getUsers)


module.exports = router