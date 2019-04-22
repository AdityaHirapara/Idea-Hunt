const express = require('express');
const moment = require('moment');
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
            let ridea = {
              _id: resIdea._id,
              title: resIdea.title,
              body: resIdea.body,
              date: resIdea.date,
              upvotes: resIdea.upvotes,
              author: resIdea.author,
              comments: resIdea.comments
            }
            ridea.comments = resIdea.comments.map(c => {
              date = c.date.toUTCString();
              let comment = {
                _id: c._id,
                author: c.author,
                date: moment(date).format("D MMM, YYYY"),
                body: c.body
              }
              return comment;
            }).reverse();
            res.send({ idea: ridea });
          })
        }
      })
    } else {
      res.status(400).send({ error: "Bad request" });
    }
  });
});

module.exports = router;