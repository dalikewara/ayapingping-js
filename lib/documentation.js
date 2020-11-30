/*!
 * documentation.js
 * Copyright(c) 2018-2020 Dali Kewara
 * MIT Licensed
 */

'use strict';

var path = require('path');
var swaggerUi = require('swagger-ui-express');
var yaml = require('yamljs');

var defaultOption = {
  provider: process.appjsPlgOpt.provider || 'swagger',
  url: process.appjsPlgOpt.url || '/docs',
  options: process.appjsPlgOpt.options || {},
  explorer: process.appjsPlgOpt.explorer || false,
  customCss: process.appjsPlgOpt.customCss || null,
  customCssUrl: process.appjsPlgOpt.customCssUrl || null,
  customJsUrl: process.appjsPlgOpt.customJsUrl || null,
  customSiteTitle: process.appjsPlgOpt.customSiteTitle || null,
  customfavIcon: process.appjsPlgOpt.customfavIcon || null,
  loadFile: process.appjsPlgOpt.loadFile || null,
  loadUrl: process.appjsPlgOpt.loadUrl || null,
  loadUrls: process.appjsPlgOpt.loadUrls || null,
};

module.exports = function (app, proto, resolve, reject) {
  var projectRoot = proto.vars.__projectRoot;
  if (defaultOption.provider === 'swagger') {
    var options = {};
    options.swaggerOptions = defaultOption.options;
    options.explorer = defaultOption.explorer;
    options.customCss = defaultOption.customCss;
    options.customCssUrl = defaultOption.customCssUrl;
    options.customJs = defaultOption.customJsUrl;
    if (defaultOption.loadUrl) options.swaggerOptions.url = defaultOption.loadUrl;
    if (defaultOption.loadUrls) options.swaggerOptions.urls = defaultOption.loadUrls;
    var docFile = defaultOption.loadFile;
    if (docFile) {
      options.swaggerOptions.url = null;
      options.swaggerOptions.urls = null;
      var docExtension = docFile.split('.').slice(-1)[0];
      docFile = path.join(projectRoot, docFile);
      switch (docExtension) {
        case 'json':
          docFile = require(docFile);
          break;
        case 'yaml':
          docFile = yaml.load(docFile);
          break;
        default:
          return reject('Document extension ".' + docExtension + '" is not supported!');
      }
    }
    app.use(defaultOption.url, swaggerUi.serve, swaggerUi.setup(docFile, options));
  }
  resolve();
};