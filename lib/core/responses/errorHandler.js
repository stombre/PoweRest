'use strict';

const handler = require('./handler');
const CustomError = require('../errors').Custom;

function injectDependencies(expressResponse, params) {

  function errorHandler(error) {
    if(error instanceof CustomError) {
      const body = {

      };

      return handler(expressResponse, error.statusCode, body, params);
    }

    handler(expressResponse, 500, error, params);
  }

  return errorHandler;
}

module.exports = injectDependencies;