const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const passport = require('../../strategies/passport-user');
const Idea = require('../../models/idea');

router.get('/:id', passport.authenticate('bearer', { session: false }), function(req, res) {
  let author = req.user._id;
  let id = req.params.id;
  
  Idea.findById(id, function(err, idea) {
    if (err) {
      res.status(500).send(err);
      console.log(error);
    }
    if (idea) {
      let index = idea.upvotes.findIndex((id) => mongoose.Types.ObjectId(author).toString() == mongoose.Types.ObjectId(id).toString());
      if (index > -1) {
        idea.upvotes.splice(index, 1);
      } else {
        idea.upvotes.push(author);
      }
      Idea.findByIdAndUpdate(id, { upvotes: idea.upvotes }, function(err, resIdea) {
        if (err) {
          res.status(500).send(err);
          console.log(error);
        }
        if (resIdea) {
          resIdea.upvotes = idea.upvotes;
          let opts = [
            { path: 'author', select: 'username' },
            { path: 'comments.author', select: 'username' },
            { path: 'upvotes', select: 'username' },
          ];
          Idea.populate(resIdea, opts, function(err, resIdea) {
            if (err) {
              res.status(500).send(err);
            }
            res.send({ idea: resIdea });
          })
        }
      })
    } else {
      res.status(400).send({ error: "Bad request" });
    }
  });
});

module.exports = router;