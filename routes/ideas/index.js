const express = require('express');
const ideaRouter = express.Router();

ideaRouter.use('/get_idea', require('./get-idea'));
ideaRouter.use('/post', require('./post-idea'));
ideaRouter.use('/comment', require('./comment'));
ideaRouter.use('/upvote', require('./upvote'));

module.exports = ideasRouter;