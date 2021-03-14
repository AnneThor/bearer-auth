'use strict';

require('dotenv').config();
const sessions = process.env.STRATEGY;

module.exports = (req, res, next) => {
  if (sessions) {
    if (req.session.user) {
      next();
    } else {
      next({ status: 403, message: "Restricted access" });
    }
  }
}
