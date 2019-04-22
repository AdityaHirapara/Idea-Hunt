const express = require('express');
const moment = require('moment');
const passport = require('../../strategies/passport-user');
const router = express.Router();

const User = require('../../models/user');
const Idea = require('../../models/idea');

router.get('/', passport.authenticate('bearer', { session: false }), function(req, res) {
  User.findOne({ username: req.user.username }, function(error, user) {
    if (error) {
      res.status(500).send(error);
    }
    if (user) {
      res.send({
        id: user._id,
        username: user.username,
        email: user.email,
        joining: user.joining
      });
    } else {
      res.status(400).send({ error: "Bad request"});
    }
  });
});

router.get('/:id', passport.authenticate('bearer', { session: false }), function(req, res) {
  User.findOne({ _id: req.params.id }, function(error, user) {
    if (error) {
      res.status(500).send(error);
    }
    if (user) {
      Idea.find({ author: user._id }, function(error, ideas) {
        if (error) {
          res.status(500).send(error);
        }
        let opts = [
          { path: 'author', select: 'username' },
          { path: 'upvotes', select: 'username' },
        ];
        Idea.populate(ideas, opts, function(error, ideas) {
          if (error) {
            res.status(500).send(error);
          }
          let rideas = ideas.map((i) => {
            let date = i.date.toUTCString();
            let idea = {
              _id: i._id,
              title: i.title,
              body: i.body,
              date: moment(date).format("D MMM, YYYY"),
              upvotes: i.upvotes,
              author: i.author
            }
            return idea;
          })
          res.send({
            username: user.username,
            email: user.email,
            joining: moment(user.joining.toUTCString()).format("D MMM, YYYY"),
            ideas: rideas.reverse()
          });
        });
      })
      
    } else {
      res.status(400).send({ error: "Bad request"});
    }
  });
});

module.exports = router;