const express = require('express')
const { createUser } = require('../contollers/userController')

const router = express.Router()

router.post('/create-user',createUser)

module.exports = router