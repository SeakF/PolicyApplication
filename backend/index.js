const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const path = require('path')
const jwt = require('jsonwebtoken')
const pdf = require('html-pdf')
const items = require('./routes/api/items.js')
const pdfRoute = require('./routes/api/pdf.js')
const smsRoute = require('./routes/api/sms.js')
const fs = require('fs-extra')


const app = express()


//set up app
dotenv.config() // env

app.use(bodyParser.json())
app.use(cors({
    origin: process.env.CORS
}))
//

//mongoose
mongoose
    .connect(process.env.DB_CONFIG, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err))
//


// app.post('/auth', (req, res) => { // funkcja do ustawienia tokenu
//     token == req.body.idToken
// })
app.post('/auth', (req, res) => {
    const username = req.body.name
    const user = {username: username}
    jwt.sign(user, process.env.USER_TOKEN, (err, token) => {
        res.json({accessToken: token})
    })
})

// Routes
app.use('/api/items', authorization, items)
app.use('/api/pdf', authorization, pdfRoute)
app.use('/api/sms', authorization, smsRoute)

function authorization (req, res, next) { // funkcja do tokenów
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.USER_TOKEN, (err, user) => {
        if (err) return res.sendStatus(403)
        next()
    })
}

// Serve static if in production
if (process.env.NODE_ENV === 'PRODUCTION') {
    app.use(express.static('../frontend/build')) //static folder
    
    app.get('*', (req, res) => { //pathing
        res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'))
    })
}


const port = process.env.PORT || 5000 

//listen
app.listen(port, () => console.log(`listening at ${port}`))
