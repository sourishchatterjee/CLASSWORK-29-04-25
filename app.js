require('dotenv').config()

const express = require('express');
const app = express();
const connectDB = require("./dataBase/db")
//const path= require('path')
const router = require('./router/route')

 app.use(express.json());
 app.use(express.urlencoded({extends:true}));
 //app.use(express.static(path.join(__dirname,"public")));

app.use('/',router);



const port= process.env.PORT
app.listen(port,function () {
    
    connectDB();
    console.log(`database connected successfuly ${port}`);
})