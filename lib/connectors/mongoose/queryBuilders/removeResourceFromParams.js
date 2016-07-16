'use strict';

function removeResourceFromParams(inputParams) {
  const query = {};

  for(let paramName in Object.keys(inputParams.params)) {
    query[paramName] = inputParams.params[paramName];
  }

  return {
    query,
    options: {}
  };
}


module.exports = removeResourceFromParams;