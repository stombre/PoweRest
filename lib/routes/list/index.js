'use strict';

const responseHandler = require('../../../core/responses/handler');
const errorHandler = require('../../../core/responses/errorHandler');

const SYSTEM_WORDS = ['skip', 'limit', 'sort', 'fields'];

function injectListHandler(controller, params) {
  params = params || {};

  function listHandler(request, response) {
    //Pagination :
    const skip = request.query.skip || 0;
    const limit = request.query.limit || params.defaultLimit || 20;
    const sort = request.query.sort ? request.query.sort.split(',') : null;
    const fields = request.query.fields ? request.query.fields.split(',') : null;

    const filter = {};
    for(let varKey in Object.keys(request.query)) {
      if(SYSTEM_WORDS.indexOf(varKey) === -1) {
        let currentValue = request.query[varKey];
        filter[varKey] = currentValue.split(',');
      }
    }


    const controllerParams = {
      skip,
      limit,
      sort,
      fields,
      filter,
      params: request.params
    };

    controller(controllerParams)
      .then(function(controllerResult) {
        const body = {
          metadata: {
            skip,
            limit,
            count: controllerResult.count
          },
          results: controllerResult.results
        };

        responseHandler(response, 200, params)(body);
      })
      .catch(errorHandler(response, params));


  }

  return listHandler;
}

module.exports = injectListHandler;