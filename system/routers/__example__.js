/*!
 * __example__.js
 * Copyright(c) 2018-2020 Dali Kewara
 * MIT Licensed
 */

'use strict';

/**
 * Load necessary packages.
 */

// var fs = require('fs');

/**
 * Default environment variables.
 */

// var defaultEnv = {
//   myKey: process.env.MY_VALUE || 'my value'
// };

/**
 * Default configuration variables.
 */

// var defaultConfig = {
//   myKey: 'my value'
// };

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
  app.use(function(req, res, next) {
    next();
  });
  resolve();
};

/**
 * Another example, you can use systemRouter's method
 * as main module.
 *
 * In config.json -> system_routers -> systemRouterName::systemRouterMethod
 *
 * Example:
 * "use_before_app": ["exampleSystemRouter::exampleMethod"]
 */

// exports.myMethod = function (app, proto, config, resolve, reject) {
//   app.use(function (req, res, next) {
//     next();
//   });
//   resolve();
// };