'use strict';

const Joi = require('joi');

const BadRequest = require('../../../core/errors').BadRequest;
const responseHandler = require('../../../core/responses/handler');
const errorHandler = require('../../../core/responses/errorHandler');

function injectPutHandler(controller, params) {
  params = params || {};

  function putHandler(request, response) {
    const resource = request.body;
    Joi.validate(resource, params.resourceSchema, function(err, resource) {
      if(err) {
        return errorHandler(response, params)(new BadRequest(err.message));
      }

      const controllerParams = {
        resource,
        params: request.params
      };

      controller(controllerParams)
        .then(responseHandler(response, 200, params))
        .catch(errorHandler(response, params));

    });


  }

  return putHandler;
}

module.exports = injectPutHandler;