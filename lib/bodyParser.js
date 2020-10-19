/*!
 * bodyParser.js
 * Copyright(c) 2018-2020 Dali Kewara
 * MIT Licensed
 */

'use strict';

/**
 * Load necessary packages.
 */

var bodyParser = require('body-parser');

/**
 * Default configuration variables.
 */

var defaultConfig = {
  payloads: [
    'json',
    'urlencoded',
    'text',
    'raw'
  ],
  jsonInflate: true,
  jsonLimit: '10mb',
  jsonStrict: true,
  urlencodedExtended: false,
  urlencodedInflate: true,
  urlencodedLimit: '10mb',
  urlencodedParameterLimit: 1000,
  textCharset: 'utf-8',
  textInflate: true,
  textLimit: '10mb',
  rawInflate: true,
  rawLimit: '10mb'
};

/**
 * Main module.
 * 
 * @param {object} app - ExpressJS application-level
 * @param {object} proto - System proto variables | __var & __mod
 * @param {object} config - This module configuration | from config.json
 * @param {function} resolve - resolve | if done & ok | resolve();
 * @param {function} reject - reject | if error | reject(err);
 * @public
 */

module.exports = function (app, proto, config, resolve, reject) {
  var payloads = config.payloads || defaultConfig.payloads;
  payloads.forEach(function(val) {
    if (val === 'json') {
      app.use(bodyParser.json({
        inflate: config.jsonInflate || defaultConfig.jsonInflate,
        limit: config.jsonLimit || defaultConfig.jsonLimit,
        strict: config.jsonStrict || defaultConfig.jsonStrict
      }));
    }
    if (val === 'urlencoded') {
      app.use(bodyParser.urlencoded({
        extended: config.urlencodedExtended || defaultConfig.urlencodedExtended,
        inflate: config.urlencodedInflate || defaultConfig.urlencodedInflate,
        limit: config.urlencodedLimit || defaultConfig.urlencodedLimit,
        parameterLimit: config.urlencodedParameterLimit || defaultConfig.urlencodedParameterLimit
      }));
    }
    if (val === 'text') {
      app.use(bodyParser.text({
        charset: config.textCharset || defaultConfig.textCharset,
        inflate: config.textInflate || defaultConfig.textInflate,
        limit: config.textLimit || defaultConfig.textLimit
      }));
    }
    if (val === 'raw') {
      app.use(bodyParser.raw({
        inflate: config.rawInflate || defaultConfig.rawInflate,
        limit: config.rawLimit || defaultConfig.rawLimit
      }));
    }
  });
  resolve();
};
