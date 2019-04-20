const express = require('express');
const userRouter = express.Router();

userRouter.use('/register', require('./register'));
userRouter.use('/login', require('./login'));
userRouter.use('/logout', require('./logout'));

module.exports = userRouter;