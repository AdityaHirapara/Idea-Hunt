const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const User = require('../models/user');

passport.use(new BearerStrategy(
  function(token, cb) {
    User.findOne({token: token}, (err, user) => {
      if (err) {
        return cb(err);
      }
      if (!user) {
        return cb(null, false);
      }
      return cb(null, user);
    })
  }
));

module.exports = passport;