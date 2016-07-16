'use strict';

const getListQueryFromParams = require('../queryBuilders/getListQueryFromParams');

function injectGetResourcesList(getMongooseHandler) {

  function getResourcesList(params) {
    return getListQueryFromParams(params)
      .then(function getResourcesListHandler(mongooseParams) {
        return getMongooseHandler(mongooseParams.query, mongooseParams.select, mongooseParams.options);
      });
  }

  return getResourcesList;
}

module.exports = injectGetResourcesList;
