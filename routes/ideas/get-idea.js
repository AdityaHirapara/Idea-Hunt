const express = require('express');
const moment = require('moment');
const router = express.Router();

const passport = require('../../strategies/passport-user');
const Idea = require('../../models/idea');

router.get('/', passport.authenticate('bearer', { session: false }), function(req, res) {
  Idea.find({ }, '_id title body author upvotes date', function(err, ideas) {
    if (err) {
      res.status(500).send(err);
      console.log(err);
    }
    if (ideas) {
      let opts = [
        { path: 'author', select: 'username' },
        { path: 'upvotes', select: 'username' },
      ];
      Idea.populate(ideas, opts, function(err, ideaList) {
        if (err) {
          res.status(500).send(err);
        }
        let rideas = ideaList.map((i) => {
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
        res.send({ ideaList: rideas.reverse() });
      })
    } else {
      res.status(400).send({ error: "Bad request" });
    }
  });
});

router.get('/:id', passport.authenticate('bearer', { session: false }), function(req, res) {
  let id = req.params.id;
  
  Idea.findById(id, function(err, idea) {
    if (err) {
      res.status(500).send(err);
      console.log(err);
    }
    if (idea) {
      let opts = [
        { path: 'author', select: 'username' },
        { path: 'comments.author', select: 'username' },
        { path: 'upvotes', select: 'username' },
      ];
      Idea.populate(idea, opts, function(err, idea) {
        if (err) {
          res.status(500).send(err);
        }
        let date = idea.date.toUTCString();
        let ridea = {
          _id: idea._id,
          title: idea.title,
          body: idea.body,
          date: moment(date).format("D MMM, YYYY"),
          upvotes: idea.upvotes,
          author: idea.author,
          comments: idea.comments
        }
        ridea.comments = ridea.comments.map(c => {
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
    } else {
      res.status(400).send({ error: "Bad request" });
    }
  });
});

module.exports = router;