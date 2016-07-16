'use strict';
const util = require('util');
const CustomError = require('./CustomError');

function NotAcceptable(message, userMessage) {
  NotAcceptable.super_.call(this, message, userMessage);
  this.statusCode = 406;
}

util.inherits(NotAcceptable, CustomError);

module.exports = NotAcceptable;