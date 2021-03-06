const express = require('express');
const app = express();
const port = process.env.PORT || 3030;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const config = require('./config');
const router = require('./routes');

mongoose.connect(config.mongoUrl, {useNewUrlParser: true});
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/', router);

app.listen(port, () => {
  console.log("Listening on " + port);
});