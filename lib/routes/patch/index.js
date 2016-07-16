'use strict';

const Joi = require('joi');
const inputSchema = require('./joiInputSchema');

const BadRequest = require('../../../core/errors').BadRequest;
const responseHandler = require('../../../core/responses/handler');
const errorHandler = require('../../../core/responses/errorHandler');

function injectPatchHandler(controller, params) {
  params = params || {};

  function patchHandler(request, response) {
    const patchInputOperations = Array.isArray(request.body) ? request.body : [request.body];

    Joi.validate(patchInputOperations, inputSchema, function(err, patchInputOperations) {
      if(err) {
        return errorHandler(response, params)(new BadRequest(err.message));
      }

      const patchOperations = {
        test: [],
        add: [],
        move: [],
        replace: [],
        remove: [],
        copy: []
      };

      patchInputOperations.forEach(function(operation) {
        patchOperations[operation.op].push(operation);
      });

      const controllerParams = {
        patchOperations,
        params: request.params
      };

      controller(controllerParams)
        .then(responseHandler(response, 201, params))
        .catch(errorHandler(response, params));

    });


  }

  return patchHandler;
}

module.exports = injectPatchHandler;