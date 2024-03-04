const express = require('express');
const app = express();
const bodyParser=require("body-parser").urlencoded({extended:true});
const mongoose = require('mongoose');
const path = require('path');

app.set('view engine', 'ejs')
app.set('views','views')
app.use(express.static('css', { extensions: ['css'] }));
app.use(express.static('js', { extensions: ['js'] }));
app.use('/img', express.static('img'));



app.get("/",(req,res)=>{
res.sendFile(path.join(__dirname,"/index.html"))
  
})

app.listen(3000,()=>{
console.log("working on port 3000")

  
})