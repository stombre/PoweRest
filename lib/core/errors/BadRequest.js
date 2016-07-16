'use strict';
const util = require('util');
const CustomError = require('./CustomError');

function BadRequest(message, userMessage) {
  BadRequest.super_.call(this, message, userMessage);
  this.statusCode = 400;
}

util.inherits(BadRequest, CustomError);

module.exports = BadRequest;