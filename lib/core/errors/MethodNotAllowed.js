'use strict';
const util = require('util');
const CustomError = require('./CustomError');

function MethodNotAllowed(message, userMessage) {
  MethodNotAllowed.super_.call(this, message, userMessage);
  this.statusCode = 405;
}

util.inherits(MethodNotAllowed, CustomError);

module.exports = MethodNotAllowed;