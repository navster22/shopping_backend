const express = require('express')
const passport = require('passport')

const router = express.Router()

router.get('/auth/google',passport.authenticate('google',{ scope: ['https://www.googleapis.com/auth/plus.login']}))

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/autherised-google-user')

});

router.get('/autherised-google-user', (req,res) => {
    console.log(req.session.user)
    return res.status(200).json({
        data: req.session.user
    })
})

router.get('/unautherised-google-user', (req,res) => {
    res.status(200).json({
        message: "Please use a valid google account"
    })
})


module.exports = router