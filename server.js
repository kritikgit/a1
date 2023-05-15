// const express = require('express')
const express = require("express");

const mongoose = require('mongoose');
const morgan = require ('morgan');
const bodyParser= require('body-parser');

const userroute=require('./routes/userroute');
const AuthRoute=require('./routes/userloginroute');

mongoose.connect('mongodb://127.0.0.1:27017/project1',{useNewUrlParser:true, useUnifiedTopology:true})
const db=mongoose.connection

db.on('error',(err)=>{
    console.log(err)
})

db.once('open',()=>{
    console.log('database connect established!')
})

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


 
app.post('/profile',verifytoken,(req,resp)=>{
    if(err){
        resp.send({result:"invalid token"})
    }
    else{
        resp.json({
            message:"profile accessed",
            
        })
    }
})

function verifytoken(req,res,next){
    const bearerheader=req.headers['authorization']
    if(typeof bearerheader!=='undefined'){
        const bearer=bearerheader.split("");
        const token=bearer[1];
        req.token=token;

    }else{
        resp.send({
            result:'token not valid',
        })
    }
  }


const PORT= process.env.PORT || 4530
app.use('/user',userroute)
app.use('/',AuthRoute)
app.get('/hello',(res,resp)=>{
    resp.send('helloworld')
})

 

app.listen(PORT,()=>{
    console.log('server is running ')
})


