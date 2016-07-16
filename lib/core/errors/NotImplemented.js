'use strict';
const util = require('util');
const CustomError = require('./CustomError');

function NotImplemented(message, userMessage) {
  NotImplemented.super_.call(this, message, userMessage);
  this.statusCode = 501;
}

util.inherits(NotImplemented, CustomError);

module.exports = NotImplemented;