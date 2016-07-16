'use strict';

const responseHandler = require('../../../core/responses/handler');
const errorHandler = require('../../../core/responses/errorHandler');

function injectRemoveHandler(controller, params) {
  params = params || {};

  function removeHandler(request, response) {

    const controllerParams = {
      params: request.params
    };

    controller(controllerParams)
      .then(function removeSucessHandler() {
        responseHandler(response, 204, params)({});
      })
      .catch(errorHandler(response, params));


  }

  return removeHandler;
}

module.exports = injectRemoveHandler;