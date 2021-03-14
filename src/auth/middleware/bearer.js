'use strict';

require('dotenv').config();

const sessions = process.env.STRATEGY === "sessions" ? true : false;
const users = require('../models/users.js')

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) { next('Invalid Login') }
    const token = req.headers.authorization.split(' ').pop();
    const validUser = await users.authenticateWithToken(token);

    req.user = validUser;
    req.token = validUser.token;
    next();
  } catch (e) {
    res.status(403).send("Access denied");
    // next({ status: 403, message: 'Access denied' })
  }
}
