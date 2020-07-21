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
 * Value or data passed on 'resolve()' will be stored into system proto __mod.
 * 
 * @param {object} proto - System proto variables | __var & __mod
 * @param {object} config - This module configuration | from config.json
 * @param {function} resolve - resolve | if done & ok | resolve('my value');
 * @param {function} reject - reject | if error | reject(err);
 * @public
 */

module.exports = function (proto, config, resolve, reject) {
  resolve();
  // resolve('my value');
  // resolve({myKey: 'my value'});
};
