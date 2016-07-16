'use strict';

function getResourceQueryFromParams(inputParams) {
  const select = {};

  if(inputParams.fields) {
    inputParams.fields.forEach(function(field) {
      select[field] = 1;
    });
  }

  const query = {};

  for(let paramName in Object.keys(inputParams.params)) {
    query[paramName] = inputParams.params[paramName];
  }

  return Promise.resolve({
    query,
    options: {},
    select
  });
}


module.exports = getResourceQueryFromParams;