'use strict';
const util = require('util');
const CustomError = require('./CustomError');

function Conflict(message, userMessage) {
  Conflict.super_.call(this, message, userMessage);
  this.statusCode = 409;
}

util.inherits(Conflict, CustomError);

module.exports = Conflict;