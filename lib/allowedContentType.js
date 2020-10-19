/*!
 * allowedContentType.js
 * Copyright(c) 2018-2020 Dali Kewara
 * MIT Licensed
 */

'use strict';

/**
 * Default configuration variables.
 */

var defaultConfig = {
  allowed: []
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
  var allowed = config.allowed || defaultConfig.allowed;
  if (allowed.length < 1) return resolve();
  app.use(function (req, res, next) {
    var allow = false;
    allowed.forEach(function(val) {
      if (req.is(val)) allow = true;
    });
    if (!allow) return res.status(400);
    next();
  });
  resolve();
};
