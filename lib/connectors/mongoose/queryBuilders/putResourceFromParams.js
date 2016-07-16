'use strict';

function createResourceFromQuery(inputParams) {
  const resource = inputParams.resource;
  const query = {};

  for(let paramName in Object.keys(inputParams.params)) {
    query[paramName] = inputParams.params[paramName];
    resource[paramName] = inputParams.params[paramName];
  }

  return {
    query,
    resource
  };
}


module.exports = createResourceFromQuery;