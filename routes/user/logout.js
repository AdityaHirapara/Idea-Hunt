const express = require('express');
const passport = require('../../strategies/passport-user');
const router = express.Router();

const User = require('../../models/user');

router.get('/', passport.authenticate('bearer', { session: false }), function(req, res) {
  User.updateOne({ username: req.user.username }, { token: "" }, function(error, user) {
    if (error) {
      res.status(500).send(err);
    }
    if (user) res.send({ success: true });
  });
});

module.exports = router;