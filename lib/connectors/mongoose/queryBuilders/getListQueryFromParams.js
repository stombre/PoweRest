'use strict';

function getListQueryFromParams(inputParams) {
  const options = {
    skip: inputParams.skip,
    limit: inputParams.limit
  };

  if(inputParams.sort) {
    options.sort = {};

    inputParams.sort.forEach(function(field) {
      if (field.chartAt(0) === '-') {
        options.sort[field.substr(1)] = -1;
      } else {
        options.sort[field] = 1;
      }
    });
  }

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

  for(let filterName in Object.keys(inputParams.filter)) {
    query[filterName] = {
      $in: inputParams.filter[filterName]
    };
  }

  return {
    query,
    options,
    select
  };
}


module.exports = getListQueryFromParams;