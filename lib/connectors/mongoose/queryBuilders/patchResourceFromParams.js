'use strict';

function jsonPathToMongoosePath(jsonPath) {
  const path =  jsonPath.replace('/', '.');
  return path.chartAt(0) === '.' ? path.substr(1) : path;
}

function getResourceQueryFromParams(inputParams) {
  const query = {};

  for(let paramName in Object.keys(inputParams.params)) {
    query[paramName] = inputParams.params[paramName];
  }

  const patchOperations = inputParams.patchOperations;

  patchOperations.test.forEach(function patchOpTest(operation) {
    const path = jsonPathToMongoosePath(operation.path);
    query[path] = operation.value;
  });

  patchOperations.replace.forEach(function patchOpRemove(operation) {
    const path = jsonPathToMongoosePath(operation.path);

    query[path] = {
      $exists: true
    };
  });

  patchOperations.move.forEach(function patchOpRemove(operation) {
    const path = jsonPathToMongoosePath(operation.from);

    query[path] = {
      $exists: true
    };
  });

  patchOperations.copy.forEach(function patchOpRemove(operation) {
    const path = jsonPathToMongoosePath(operation.from);

    query[path] = {
      $exists: true
    };
  });


  return Promise.resolve({
    query
  });
}


module.exports = getResourceQueryFromParams;