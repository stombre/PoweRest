'use strict';

module.exports = {
  Custom: require('./Custom'),

  //400 - Request errors :
  BadRequest: require('./BadRequest'),            //400
  Unauthorized: require('./Unauthorized'),        //401
  PaymentRequired: require('./PaymentRequired'),  //402
  Forbidden: require('./Forbidden'),              //403
  NotFound: require('./NotFound'),                //404
  MethodNotAllowed: require('./MethodNotAllowed'),//405
  NotAcceptable: require('./NotAcceptable'),      //406

  Conflict: require('./Conflict'),                //409


  //500 - Server errors :
  NotImplemented: require('./NotImplemented'),    //501

};