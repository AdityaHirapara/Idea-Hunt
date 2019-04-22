const express = require('express');
const Cryptr = require('cryptr');
const config = require('../../config');
const router = express.Router();
const cryptr = new Cryptr(config.secretKey);

const User = require('../../models/user');

router.post('/', function(req, res) {
  let { username, password } = req.body;
  User.findOne({ username }, function(error, user) {
    if (error) {
      res.status(500).send(err);
    } else if (!user) {
      res.status(400).send({ error: "Invalid username!" });
    } else if (user && user.password === password) {
      let token = cryptr.encrypt(username + new Date());
      User.updateOne({ username }, { token }, function(error, user) {
        if (error) {
          res.status(500).send(err);
        }
        res.send({ token });
      })
    } else {
      res.status(400).send({ error: "Invalid password!" });
    }
  });
});

module.exports = router;