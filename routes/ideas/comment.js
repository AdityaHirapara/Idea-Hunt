const express = require('express');
const router = express.Router();

const passport = require('../../strategies/passport-user');
const Idea = require('../../models/idea');

router.post('/:id', passport.authenticate('bearer', { session: false }), function(req, res) {
  let { body } = req.body;
  let author = req.user._id;
  let id = req.params.id;
  
  Idea.findById(id, function(err, idea) {
    if (err) {
      res.status(500).send(err);
      console.log(error);
    }
    if (idea) {
      idea.comments.push({
        author,
        body
      });
      Idea.findByIdAndUpdate(id, { comments: idea.comments }, function(err, resIdea) {
        if (err) {
          res.status(500).send(err);
          console.log(error);
        }
        if (resIdea) {
          resIdea.comments = idea.comments;
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
    console.log(idea);
  });
});

module.exports = router;