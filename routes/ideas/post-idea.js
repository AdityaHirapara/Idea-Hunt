const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const passport = require('../../strategies/passport-user');
const Idea = require('../../models/idea');

router.post('/', passport.authenticate('bearer', { session: false }), function(req, res) {
  let { title, body } = req.body;
  let author = req.user._id;
  
  Idea.create({ title, body, author, comments: [], upvotes: [] }, function(err, idea) {
    if (err) {
      res.status(500).send(err);
      console.log(error);
    }
    if (idea) {
      res.send({ idea });
    }
  });
});

module.exports = router;