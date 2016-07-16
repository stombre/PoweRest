'use strict';

const Joi = require('joi');

const BadRequest = require('../../../core/errors').BadRequest;
const responseHandler = require('../../../core/responses/handler');
const errorHandler = require('../../../core/responses/errorHandler');

function injectCreateHandler(controller, params) {
  params = params || {};

  function createHandler(request, response) {
    const resource = request.body;
    Joi.validate(resource, params.resourceSchema, function(err, resource) {
      if(err) {
        return errorHandler(response, params)(new BadRequest(err.message));
      }

      const controllerParams = {
        resource
      };

      controller(controllerParams)
        .then(responseHandler(response, 201, params))
        .catch(errorHandler(response, params));

    });


  }

  return createHandler;
}

module.exports = injectCreateHandler;