'use strict';

module.exports = {
  create: require('./createResource'),
  get: require('./getResource'),
  getList: require('./getResourcesList'),
  patch: require('./patchResource'),
  put: require('./putResource'),
  remove: require('./removeResource')
};