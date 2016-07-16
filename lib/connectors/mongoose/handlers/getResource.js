'use strict';

const getResourceQueryFromParams = require('../queryBuilders/getResourceQueryFromParams');

function injectGetResource(getMongooseHandler) {

  function getResource(params) {
    return getResourceQueryFromParams(params)
      .then(function getResourceHandler(mongooseParams) {
        return getMongooseHandler(mongooseParams.query, mongooseParams.select, mongooseParams.options);
      });
  }

  return getResource;
}

module.exports = injectGetResource;
