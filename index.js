// imports
const express = require('express');
const app = express();
const path = require('path');
const bodyParser=require("body-parser").urlencoded({extended:true});
const mongoose = require('mongoose');


//DB CONNECTIONS
const mongo_username = process.env['MONGO_USERNAME'];
const mongo_password = process.env['MONGO_PASSWORD'];
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@firstdb.a6xnaav.mongodb.net/?retryWrites=true&w=majority&appName=firstdb`;

const dbname = 'deploy';
const collectionName = 'users';


const userSchema = new mongoose.Schema({
  name: String,
  email:String,
  message:String

});

const User = mongoose.model(collectionName, userSchema, collectionName);
// Serve static files
app.use(express.static('public'));

// Serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

//post middle ware

app.post("/form",bodyParser,(req,res)=>{
const username=req.body.name; 
const email=req.body.email;
const message=req.body.message;
  mongoose.connect(uri, { dbName: dbname })
  .then(() => {
    const db = mongoose.connection.db;




    const newUser = new User({
      name:username ,
      email:email,
      message:message

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





// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
