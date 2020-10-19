/*!
 * helpers.js
 * Copyright(c) 2018-2020 Dali Kewara
 * MIT Licensed
 */

'use strict';

/**
 * Load necessary packages.
 */

var fs = require('fs');
var path = require('path');

/**
 * Default configuration variables.
 */

var defaultConfig = {
  helperPath: 'helpers'
};

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
  var projectRoot = proto.__var.__projectRoot;
  var helperPath = config.helperPath || defaultConfig.helperPath;
  helperPath = path.join(projectRoot, helperPath);
  var helpers = {};
  fs.readdir(helperPath, function(err, files) {
    if (err) return reject(err);
    files.forEach((helper) => {
      if (helper.match('.js')) {
        var hpath = path.join(helperPath, helper);
        helpers[helper.replace('.js', '')] = require(hpath);
      }
    });
    var helpersLen = Object.keys(helpers).length;
    if (helpersLen < 1) {
      console.log('[ ] No helper loaded');
    } else {
      console.log('[*] ' + helpersLen + ' helpers loaded');
    }
    resolve(helpers);
  });
};
