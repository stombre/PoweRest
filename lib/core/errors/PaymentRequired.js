'use strict';
const util = require('util');
const CustomError = require('./CustomError');

function PaymentRequired(message, userMessage) {
  PaymentRequired.super_.call(this, message, userMessage);
  this.statusCode = 402;
}

util.inherits(PaymentRequired, CustomError);

module.exports = PaymentRequired;