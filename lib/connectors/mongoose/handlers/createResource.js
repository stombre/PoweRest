'use strict';

const createResourceFromParams = require('../queryBuilders/createResourceFromParams');

function injectCreateResource(createMongooseHandler) {

  function createResource(params) {
    return createResourceFromParams(params)
      .then(function createResourceHandler(mongooseParams) {
        return createMongooseHandler(mongooseParams.resource);
      });
  }

  return createResource;
}

module.exports = injectCreateResource;
