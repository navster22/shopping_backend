const express = require('express')
const passport = require('passport');
const { isAuthenticatedCustomer } = require('../passport');

const router = express.Router()

// router.get('/auth/google',passport.authenticate('google',{ scope: ['https://www.googleapis.com/auth/plus.login']}))

router.get("/auth/google", passport.authenticate("google", { scope: ["profile"] }));

router.get('/auth/google/callback', 
  passport.authenticate('google', { successRedirect: "http://127.0.0.1:3000", failureRedirect: '/' })
);

router.get('/autherised-google-user', isAuthenticatedCustomer, (req,res) => {
    console.log('Here is our session ===>',req.session)
    return res.status(200).json({
        data: req.user
    })
})

router.get('/unautherised-google-user', (req,res) => {
    res.status(200).json({
        message: "Please use a valid google account"
    })
})


module.exports = router