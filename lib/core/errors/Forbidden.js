'use strict';
const util = require('util');
const CustomError = require('./CustomError');

function Forbidden(message, userMessage) {
  Forbidden.super_.call(this, message, userMessage);
  this.statusCode = 403;
}

util.inherits(Forbidden, CustomError);

module.exports = Forbidden;