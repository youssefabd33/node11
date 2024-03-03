const express = require('express');

const url = require("url");
const app = express();
const path = require("path");
const bodyParser=require("body-parser").urlencoded({extended:true});
const mongoose = require('mongoose');


const mongo_username = process.env['MONGO_USERNAME'];
const mongo_password = process.env['MONGO_PASSWORD'];
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@firstdb.a6xnaav.mongodb.net/?retryWrites=true&w=majority&appName=firstdb`;
const dbname = 'university';
const collectionName = 'names';

const userSchema = new mongoose.Schema({
  name: String,

});

const User = mongoose.model(collectionName, userSchema, collectionName);


app.set('view engine', 'ejs')
app.set('views','views')
app.use(express.static('css', { extensions: ['css'] }));

app.use(express.static('controllers', { extensions: ['js'] }));

app.get("/",(req,res)=>{
res.sendFile(path.join(__dirname,"/form.html"))
})


app.post("/form",bodyParser,(req,res)=>{
const username=req.body.name; 
  mongoose.connect(uri, { dbName: dbname })
  .then(() => {
    const db = mongoose.connection.db;




    const newUser = new User({
      name:username ,

    });

    newUser
      .save()
      .then(() => {
        console.log("User saved successfully");
        res.send("User saved successfully");
      })
      .catch((error) => {
        console.error("Error saving user:", error);
        res.send("Error saving user");
      })
      .finally(() => {
        mongoose.connection.close(); // Close the connection after the operation is complete
      });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error);
    res.send("Error connecting to MongoDB Atlas");
  });


})







app.listen(3000, () => {
  console.log("server is running on port 3000");
});

