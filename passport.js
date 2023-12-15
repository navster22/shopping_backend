const passport = require('passport');
const Users = require('./models/users');
const Customers = require('./models/customers');
const GoogleStrategy = require('passport-google-oauth20').Strategy;


const initializePassport = (passport) => {
    var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
    var opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = process.env.JWT_KEY;
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        console.log(jwt_payload);
        Users.findOne({_id: jwt_payload.id})
        .then(user => {
            console.log(user)
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
        .catch(err => {
            return done(err, false);
        })
    }));
}

const initializeGoogleAuth = (passport) =>{
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: "http://127.0.0.1:8000/auth/google/callback"
      },
       function(accessToken, refreshToken, profile, done) {
        console.log('Profile we got at initialization of oAuth ',profile)
        console.log('Token and refresh token of oAuth ', accessToken, refreshToken)
        findOrCreateCustomer(profile,done)
        // done(null,profile)
      }
    ));

    passport.serializeUser((user,done) => {
        console.log('In serializeUser', user)
        done(null,user)
    })

    passport.deserializeUser((user,done) => {
        console.log('In deserializeUser', user)
        done(null,user)
    })
}

const findOrCreateCustomer = (profile, done) => {
    Customers.findOne({ googleId: profile.id })
        .then(customer => {
            if (customer) {
                console.log('Found customer profile', customer);
                return done(null, customer);
            } else {
                console.log('Not found customer profile');
                const req = {
                    name: profile.displayName,
                    googleId: profile.id,
                    provider: profile.provider,
                };
                const newCustomer = new Customers(req);
                return newCustomer.save();
            }
        })
        .then(newCustomer => {
            if (newCustomer) {
                console.log('Created customer profile', newCustomer);
                return done(null, newCustomer);
            }
        })
        .catch(err => {
            console.log('Error in finding/creating customer', err);
            return done(err, null);
        });
};

const isAuthenticatedCustomer = (req,res,next) => {
    console.log(req.user)
    if(req.user) return next()
    res.status(403).json({
        status: 403,
        message: "User is not authorized. Please login first."
    })
}

module.exports = {
    initializePassport,
    initializeGoogleAuth,
    isAuthenticatedCustomer
}