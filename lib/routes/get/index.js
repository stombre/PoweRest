'use strict';

const NotFound = require('../../../core/errors').NotFound;
const responseHandler = require('../../../core/responses/handler');
const errorHandler = require('../../../core/responses/errorHandler');

function injectGetHandler(controller, params) {
  params = params || {};

  function getHandler(request, response) {

    const controllerParams = {
      params: request.params
    };

    controller(controllerParams)
      .then(function getSucessHandler(result) {
        if(!result) {
          return errorHandler(response, params)(new NotFound('Resource not found'));
        }
        responseHandler(response, 200, params);
      })
      .catch(errorHandler(response, params));


  }

  return getHandler;
}

module.exports = injectGetHandler;