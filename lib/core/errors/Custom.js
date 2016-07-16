'use strict';

const util = require('util');

function CustomError(message, userMessage) {
  this.name = this.constructor.name;
  this.message = message;
  this.statusCode = 500;
  this.techMessage = message;
  this.userMessage = userMessage || message;

  Error.captureStackTrace(this, this.constructor);
}

util.inherits(CustomError, Error);

module.exports = CustomError;
