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

  patchOperations.add.forEach(function patchOpAdd(operation) {
    const path = jsonPathToMongoosePath(operation.path);

    if(!update.$set) {
      update.$set = {};
    }

    update.$set[path] = operation.value;
  });


  patchOperations.remove.forEach(function patchOpRemove(operation) {
    const path = jsonPathToMongoosePath(operation.path);

    if(!update.$unset) {
      update.$unset = {};
    }

    update.$unset[path] = '';
  });


  patchOperations.replace.forEach(function patchOpRemove(operation) {
    const path = jsonPathToMongoosePath(operation.path);

    if(!update.$set) {
      update.$set = {};
    }

    query[path] = {
      $exists: true
    };
    update.$set[path] = operation.value;
  });

  const update = {};

  return Promise.resolve({
    query,
    update,
    options: {}
  });
}


module.exports = getResourceQueryFromParams;