'use strict';

const putResourceFromParams = require('../queryBuilders/putResourceFromParams');

function injectPutResource(putMongooseHandler) {

  function putResource(params) {
    return putResourceFromParams(params)
      .then(function putResourceHandler(mongooseParams) {
        return putMongooseHandler(mongooseParams.query, mongooseParams.resource, {upsert: true});
      });
  }

  return putResource;
}

module.exports = injectPutResource;
