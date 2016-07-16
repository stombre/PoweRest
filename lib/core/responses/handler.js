'use strict';


function injectResponseDependencies(expressResponse, statusCode, params) {

  function responseHandler(responseBody) {
    expressResponse
      .status(statusCode)
      .json(responseBody);
  }

  return responseHandler;
}

module.exports = injectResponseDependencies;