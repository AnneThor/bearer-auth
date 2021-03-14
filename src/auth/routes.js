'use strict';

const express = require('express');
require('dotenv').config();
const authRouter = new express.Router();
const session = require('express-session');

const User = require('./models/users.js');
const basicAuth = require('./middleware/basic.js');
const bearerAuth = require('./middleware/bearer.js');
const restrict = require('./middleware/restrict.js');
const sessions = process.env.STRATEGY === "sessions" ? true : false;

authRouter.post('/signup', async (req, res, next) => {
  try {
    let user = new User(req.body);
    const userRecord = await user.save();
    const output = {
      user: userRecord,
      token: userRecord.token
    };
    res.status(201).json(output);
  } catch (e) {
    next(e.message)
  }
});

authRouter.post('/signin', basicAuth, (req, res, next) => {
  const user = {
    user: req.user,
    token: req.user.token
  };
  // if(sessions) {
  //   req.session.regenerate(function(err) {
  //     req.session.user = user;
  //     res.status(200).json(req.session.user);
  //   })
  // } else {
    res.status(200).json(user);
  // }
});

authRouter.get('/users', /**restrict,**/ bearerAuth, async (req, res, next) => {
  const users = await User.find({});
  const list = users.map(user => user.username);
  res.status(200).json(list);
});

authRouter.get('/secret', /**restrict,**/ bearerAuth, async (req, res, next) => {
  res.status(200).send("Welcome to the secret area!")
});

if (sessions) {

  authRouter.get('/restricted', restrict, (req, res) => {
    res.status(200).send("Restricted area!");
  });

  authRouter.get('/logout', (req, res) => {
    req.session.destroy(() => {
      res.status(200).send('You have successfully been logged out.');
    })
  })
}

module.exports = authRouter;
