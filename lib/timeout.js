/*!
 * timeout.js
 * Copyright(c) 2018-2020 Dali Kewara
 * MIT Licensed
 */

'use strict';

var timeout = require('connect-timeout');

var defaultOption = {
  timeout: process.appjsPlgOpt || '15s'
};

module.exports = function (app, proto, resolve, reject) {
  app.use(timeout(defaultOption.timeout));
  resolve();
};