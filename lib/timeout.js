/*!
 * timeout.js
 * Copyright(c) 2018-2020 Dali Kewara
 * MIT Licensed
 */

'use strict';

var timeout = require('connect-timeout');

var defaultOption = {
  timeout: (process.appjsPlgOpt && typeof process.appjsPlgOpt !== 'string') ? '60s' : process.appjsPlgOpt
};

module.exports = function (app, proto, resolve, reject) {
  app.use(timeout(defaultOption.timeout, {
    respond: false
  }));
  app.use(function (req, res, next) {
    req.on('timeout', function () {
      res.connection.destroy();
    });
    next();
  });
  resolve();
};