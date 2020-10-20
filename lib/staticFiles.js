/*!
 * staticFiles.js
 * Copyright(c) 2018-2020 Dali Kewara
 * MIT Licensed
 */

'use strict';

var express = require('express');
var path = require('path');

var defaultOption = {
  publicPath: process.appjsPlgOpt.publicPath || 'public'
};

module.exports = function (app, proto, resolve, reject) {
  var projectRoot = proto.vars.__projectRoot;
  var publicPath = defaultOption.publicPath;
  publicPath = path.join(projectRoot, publicPath);
  app.use(express.static(publicPath));
  resolve();
};