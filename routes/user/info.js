const express = require('express');
const passport = require('../../strategies/passport-user');
const router = express.Router();

const User = require('../../models/user');

router.get('/', passport.authenticate('bearer', { session: false }), function(req, res) {
  User.findOne({ username: req.user.username }, function(error, user) {
    if (error) {
      res.status(500).send(err);
    }
    if (user) {
      res.send({
        username: user.username,
        email: user.email,
        joining: user.joining
      });
    } else {
      res.status(400).send({ error: "Bad request"});
    }
  });
});

router.get('/:name', passport.authenticate('bearer', { session: false }), function(req, res) {
  User.findOne({ username: req.params.name }, function(error, user) {
    if (error) {
      res.status(500).send(err);
    }
    if (user) {
      res.send({
        username: user.username,
        email: user.email,
        joining: user.joining
      });
    } else {
      res.status(400).send({ error: "Bad request"});
    }
  });
});

module.exports = router;