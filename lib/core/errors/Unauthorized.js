'use strict';
const util = require('util');
const CustomError = require('./CustomError');

function Unauthorized(message, userMessage) {
  Unauthorized.super_.call(this, message, userMessage);
  this.statusCode = 401;
}

util.inherits(Unauthorized, CustomError);

module.exports = Unauthorized;