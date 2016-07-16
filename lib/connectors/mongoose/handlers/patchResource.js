'use strict';

const jsonPointer = require('json-pointer');
const getResourceQueryFromParams = require('../queryBuilders/getResourceQueryFromParams');
const errors = require('../../../core/errors');
const ErrorConflict = errors.Conflict;
const ErrorNotFound = errors.NotFound;

function jsonPathToMongoosePath(jsonPath) {
  const path =  jsonPath.replace('/', '.');
  return path.chartAt(0) === '.' ? path.substr(1) : path;
}

function injectCreateResource(getMongooseHandler, editMongooseHandler) {

  function getResource(params) {
    return getResourceQueryFromParams(params)
      .then(function getResourceHandler(mongooseParams) {
        return getMongooseHandler(mongooseParams.query, mongooseParams.select, mongooseParams.options);
      })
      .then(function patchResourceHandler(resources) {
        if(!resources || !resources.length) {
          return Promise.reject(new ErrorNotFound('No resource match the patch request'));
        }
        const resource = resources[0];
        let error = false;

        const patchOperations = inputParams.patchOperations;
        const query = {
          $set: {},
          $unset: {}
        };

        patchOperations.add.forEach(function patchOpAdd(operation) {
          const path = jsonPathToMongoosePath(operation.path);
          query.$set[path] = operation.value;
        });

        patchOperations.remove.forEach(function patchOpRemove(operation) {
          const path = jsonPathToMongoosePath(operation.path);
          query.$unset[path] = operation.value;
        });

        patchOperations.copy.forEach(function patchOpCopy(operation) {
          if(jsonPointer.has(resource, operation.from)) {
            const from = jsonPointer.get(resource, operation.from);
            const path = jsonPathToMongoosePath(operation.path);
            query.$set[path] = from;
          } else {
            error = true;
          }
        });

        patchOperations.move.forEach(function patchOpMove(operation) {
          if(jsonPointer.has(resource, operation.from)) {
            const from = jsonPointer.get(resource, operation.from);
            const path = jsonPathToMongoosePath(operation.path);
            const pathFrom = jsonPathToMongoosePath(operation.from);
            query.$set[path] = from;
            query.$unset[pathFrom] = '';
          } else {
            error = true;
          }
        });

        patchOperations.replace.forEach(function patchOpReplace(operation) {
          if(jsonPointer.has(resource, operation.path)) {
            const path = jsonPathToMongoosePath(operation.path);
            query.$set[path] = operation.value;
          } else {
            error = true;
          }
        });

        if(error) {
          return Promise.reject(new ErrorConflict('The resource is in an invalid state to apply PATCH'));
        }

        return editMongooseHandler({_id: resource._id}, query);
      });
  }

  return getResource;
}

module.exports = injectCreateResource;
