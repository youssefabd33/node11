const mongoose = require('mongoose');

// DB CONNECTIONS
const mongo_username = process.env['MONGO_USERNAME'];
const mongo_password = process.env['MONGO_PASSWORD'];
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@firstdb.a6xnaav.mongodb.net/?retryWrites=true&w=majority&appName=firstdb`;

const dbname = 'deploy';
const collectionName = 'users';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

const User = mongoose.model(collectionName, userSchema, collectionName);

exports.insertUser = (name, email, message) => {
  return new Promise((resolve, reject) => {
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, dbName: dbname })
      .then(() => {
        const newUser = new User({
          name: name,
          email: email,
          message: message
        });
        return newUser.save();
      })
      .then(success => {
        mongoose.disconnect();
        resolve(success);
      })
      .catch(err => reject(err));
  });
};