import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
//import FileStore from "session-file-store";
import handlebars from 'express-handlebars'
import { __dirname } from "./utils.js";
import viewsRouter from './routes/views.router.js'
import userRouter from './routes/user.router.js'
import './db/dbConfig.js'
import MongoStore from "connect-mongo";

const app = express ()

app.use (express.json())
app.use (express.urlencoded({extended:true}))

//archivo estaticos
app.use(express.static(__dirname + '/public'))

//Configuracion de motor de plantilla
app.engine('handlebars', handlebars.engine({
    partialsDir: __dirname + '/views/partials',
}))
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

//Cookie 
app.use (cookieParser ())

//FileStore
//const fileStore = FileStore (session)

//Session
app.use(session({
    store: new MongoStore ({
        mongoUrl: 'mongodb+srv://chino:mamadera@cluster0.nur3pb3.mongodb.net/ecommerce?retryWrites=true&w=majority'
    }),
    secret: 'secretKey',
    cookie:{
        maxAge:50000
    }
}))



//Routes
app.use ('/', viewsRouter)
app.use ('/users', userRouter)

app.listen (8000, ()=>{
    console.log('Servidor escuchando');
})