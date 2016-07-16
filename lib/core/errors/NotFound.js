'use strict';
const util = require('util');
const CustomError = require('./CustomError');

function NotFound(message, userMessage) {
  NotFound.super_.call(this, message, userMessage);
  this.statusCode = 404;
}

util.inherits(NotFound, CustomError);

module.exports = NotFound;