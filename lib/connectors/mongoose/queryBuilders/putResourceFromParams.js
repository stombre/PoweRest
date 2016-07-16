'use strict';

function createResourceFromQuery(inputParams) {
  const resource = inputParams.resource;
  const query = {};

  for(let paramName in Object.keys(inputParams.params)) {
    query[paramName] = inputParams.params[paramName];
    resource[paramName] = inputParams.params[paramName];
  }

  return Promise.resolve({
    query,
    resource
  });
}


module.exports = createResourceFromQuery;