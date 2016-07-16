'use strict';

function createResourceFromQuery(inputParams) {
  const resource = inputParams.resource;

  for(let paramName in Object.keys(inputParams.params)) {
    resource[paramName] = inputParams.params[paramName];
  }

  return {
    resource
  };
}


module.exports = createResourceFromQuery;