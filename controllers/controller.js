const userModel = require('../model/model');

exports.homeController = (req, res) => {
  res.render('index');
};

exports.userController = (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;
  userModel.insertUser(name, email, message)
    .then(() => res.render('thank'))
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
};