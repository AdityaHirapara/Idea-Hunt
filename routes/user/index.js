const express = require('express');
const userRouter = express.Router();

userRouter.use('/signup', require('./signup'));
userRouter.use('/login', require('./login'));
userRouter.use('./logout', require('./logout'));

module.exports = userRouter;