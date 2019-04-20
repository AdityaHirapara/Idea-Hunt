const express = require('express');
const Cryptr = require('cryptr');
const config = require('../../config');
const router = express.Router();
const cryptr = new Cryptr(config.secretKey);

const User = require('../../models/user');

router.post('/', function(req, res) {
  let { username, password, email } = req.body;
  User.findOne({ username }, function(err, user) {
    if (err) {
      res.status(500).send(err);
    }

    if (user) {
      res.status(400).send({ error: "Username is already taken!" });
    } else {
      let token = cryptr.encrypt(username + new Date());
      User.create({ username, password, email, token }, function(err, user) {
        if (err) {
          console.log(error);
        }
        if (user) {
          res.send({ token });
        }
        console.log(user);
      });
    }
  });
});

module.exports = router;