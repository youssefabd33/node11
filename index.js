const express = require('express');
const app = express();
const route = require('./router/userRouter');
const bodyParser = require("body-parser");

// Serve static files
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",route)

app.post("/form", route);

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});