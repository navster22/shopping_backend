const express  = require('express')
const mongoConnection = require('./conection')
const cors = require('cors')
const routes = require('./routes/index')
const passport = require('passport')
const { initializePassport } = require('./passport')

require('dotenv').config()
const app = express()
app.use(cors())
mongoConnection(process.env.URI)

app.use('/files',express.static('uploads'))

initializePassport(passport);

app.use(passport.initialize())

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.use(routes)

app.listen(process.env.PORT)