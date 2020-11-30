/*!
 * allowedContentType.js
 * Copyright(c) 2018-2020 Dali Kewara
 * MIT Licensed
 */

'use strict';

var defaultOption = {
  allowed: process.appjsPlgOpt.allowed || []
};

module.exports = function (app, proto, resolve, reject) {
  var allowed = defaultOption.allowed;
  if (allowed.length < 1) return resolve();
  app.use(function (req, res, next) {
    var allow = false;
    allowed.forEach(function (val) {
      if (req.is(val)) allow = true;
    });
    if (!allow) return res.status(405).send('Content type not allowed!');
    next();
  });
  resolve();
};