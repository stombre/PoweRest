'use strict';

const getListQueryFromParams = require('../queryBuilders/getListQueryFromParams');

function injectGetResourcesList(getMongooseHandler, countMongooseHandler) {

  function getResourcesList(params) {
    return getListQueryFromParams(params)
      .then(function getResourcesListHandler(mongooseParams) {
        return Promise.all([
          getMongooseHandler(mongooseParams.query, mongooseParams.select, mongooseParams.options),
          countMongooseHandler(mongooseParams.query)
          ]);
      })
      .then(function(promiseResults) {
        return {
          results: promiseResults[0],
          count: promiseResults[1]
        }
      });
  }

  return getResourcesList;
}

module.exports = injectGetResourcesList;
