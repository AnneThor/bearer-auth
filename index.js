'use strict';

// Start up DB Server
const mongoose = require('mongoose');
require('dotenv').config();
const PORT = process.env.PORT || 3333;

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};
mongoose.connect(process.env.MONGODB_URI, options);

// Start the web server
require('./src/server.js').start(PORT);
