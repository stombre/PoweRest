'use strict';

const removeResourceFromParams = require('../queryBuilders/removeResourceFromParams');

function injectRemoveResource(removeMongooseHandler) {

  function removeResource(params) {
    return removeResourceFromParams(params)
      .then(function removeResourceHandler(mongooseParams) {
        return removeMongooseHandler(mongooseParams.query);
      });
  }

  return removeResource;
}

module.exports = injectRemoveResource;
