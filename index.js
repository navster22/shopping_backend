const express  = require('express')
const mongoConnection = require('./conection')
const cors = require('cors')
const routes = require('./routes')
var session = require('express-session')
const passport = require('passport')
const { initializePassport, initializeGoogleAuth } = require('./passport')

require('dotenv').config()
const app = express()
app.use(cors({
    origin: true,
    credentials: true
}))
mongoConnection(process.env.URI)

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false,
    },
}))

app.use('/files',express.static('uploads'))

initializePassport(passport);
initializeGoogleAuth(passport);

app.use(passport.initialize())
app.use(passport.session())

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.use(routes)

app.listen(process.env.PORT)