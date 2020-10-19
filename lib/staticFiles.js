/*!
 * staticFiles.js
 * Copyright(c) 2018-2020 Dali Kewara
 * MIT Licensed
 */

'use strict';

/**
 * Load necessary packages.
 */

var express = require('express');
var path = require('path');

/**
 * Default configuration variables.
 */

var defaultConfig = {
  publicPath: 'public'
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
  var projectRoot = proto.__var.__projectRoot;
  var publicPath = config.publicPath || defaultConfig.publicPath;
  publicPath = path.join(projectRoot, publicPath);
  app.use(express.static(publicPath));
  resolve();
};
