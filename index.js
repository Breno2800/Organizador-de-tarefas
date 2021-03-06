const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')
const mongoose = require('mongoose')
const rota1 = require('./routes/rota1')
const session = require("express-session")
const flash = require("connect-flash")



app.use(session({
    secret: "breno1804",
    resave: true,
    saveUninitialized: true
}))

app.use(flash())

//midleware
    app.use((req, res, next) => {
        res.locals.success_msg = req.flash("success_msg")
        res.locals.error_msg = req.flash("error_msg")
        next()
    })

// arquivos estáticos
app.use(express.static(path.join(__dirname + 'public')))
app.use(express.static(path.join( 'public/css')))
app.use(express.static(path.join( 'public/js')))


//handlebars
app.engine('handlebars', handlebars({defaultLayout: 'index'}))
app.set('view engine', 'handlebars');




//body Parser
app.use(bodyParser.urlencoded({extended: true}))
app.set(bodyParser.json)

//mongoose
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/organizador').then(() =>{
    console.log('conectado ao servidor')
}).catch((err) => {
    console.log('erro ao se conectar')
})



app.use('/rota1', rota1 )

const PORT = 3031
app.listen(PORT, ( )=> {
    console.log('servidor rodando')
})
