'use strict';

module.exports = {
  Custom: require('./Custom'),

  //400 - Request errors :
  BadRequest: require('./BadRequest'),    //400
  Unauthorized: require('./Unauthorized'),  //401
  Forbidden: require('./Forbidden'),      //403
  NotFound: require('./NotFound'),        //404
};