// // // // CONSTANTS // // // //

require('dotenv').config()

const {SERVER_PORT,CONNECTION_STRING, SESSION_SECRET} = process.env

const express = require('express')
const massive = require('massive')
const socket = require('socket.io')
const session = require('express-session')

// // // // CONTROLLERS/LISTENERS // // // //
const ssl = require('./setSocketListeners')
const ac = require('./controllers/authcontroller')

const app = express()
// // // // MIDDLEWARES // // // //

app.use(express.json())

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

// // // // DATABASE/SERVER/SOCKET SETUP // // // //

massive(CONNECTION_STRING).then((db) => {
    app.set('db', db)
    console.log('Database Connected')
    
    const io=socket(app.listen(SERVER_PORT, () => { console.log(`Magic at ${SERVER_PORT}`) }))  //sockets initialized and server listening

    io.on('connection',socket=>{
        console.log('User Connected')
        ssl.setSocketListeners(socket,db,io)       // reference to sockets' listeners' file
    })

})

// // // // ENDPOINTS // // // //

app.post(`/auth/register`,ac.register)
app.post(`/auth/login`,ac.login)
app.post(`/auth/logout`,ac.logout)
app.get(`/auth/user`, ac.getUser)

