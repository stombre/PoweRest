'use strict';

const Joi = require('joi');

module.exports = Joi.array().items(
  Joi.object().keys({
    op: Joi.string().valid('add', 'test', 'remove', 'copy', 'replace', 'move'),
    path: Joi.string(),
    value: Joi.any(),
    from: Joi.string()
  })
);

