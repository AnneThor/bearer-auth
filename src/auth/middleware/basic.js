'use strict';

const base64 = require('base-64');
require('dotenv').config();

const sessions = process.env.STRATEGY === "sessions" ? true : false;
const User = require('../models/users.js');

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) { next('No credentials provided') }
  let basic = req.headers.authorization.split(' ').pop();
  let [user, pass] = base64.decode(basic).split(':');
  try {
    req.user = await User.authenticateBasic(user, pass);
    next();
  } catch (e) {
    res.status(403).send('User not found');
  }
}
