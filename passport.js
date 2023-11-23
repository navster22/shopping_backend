const passport = require('passport');
const Users = require('./models/users');
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
        callbackURL: "http://localhost:8000/auth/google/callback"
      },
      function(accessToken, refreshToken, profile, done) {
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //   return cb(err, user);
        // });
        console.log(profile)
        return done(null, profile);
      }
    ));

    passport.serializeUser((user,done) => {
        console.log('In serializeUser')
        done(null,user)
    })

    passport.deserializeUser((obj,done) => {
        console.log('In deserializeUser')
            done(null,obj)
    })
}

module.exports = {
    initializePassport,
    initializeGoogleAuth
}