/*!
 * bodyParser.js
 * Copyright(c) 2018-2020 Dali Kewara
 * MIT Licensed
 */

'use strict';

var bodyParser = require('body-parser');

var defaultOption = {
  payloads: process.appjsPlgOpt.payloads || [
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

module.exports = function (app, proto, resolve, reject) {
  defaultOption.payloads.forEach(function(val) {
    if (val === 'json') {
      app.use(bodyParser.json({
        inflate: defaultOption.jsonInflate,
        limit: defaultOption.jsonLimit,
        strict: defaultOption.jsonStrict
      }));
    }
    if (val === 'urlencoded') {
      app.use(bodyParser.urlencoded({
        extended: defaultOption.urlencodedExtended,
        inflate: defaultOption.urlencodedInflate,
        limit: defaultOption.urlencodedLimit,
        parameterLimit: defaultOption.urlencodedParameterLimit
      }));
    }
    if (val === 'text') {
      app.use(bodyParser.text({
        charset: defaultOption.textCharset,
        inflate: defaultOption.textInflate,
        limit: defaultOption.textLimit
      }));
    }
    if (val === 'raw') {
      app.use(bodyParser.raw({
        inflate: defaultOption.rawInflate,
        limit: defaultOption.rawLimit
      }));
    }
  });
  resolve();
};