/*!
 * exampleMiddleware.js
 * Copyright(c) 2018-2020 Dali Kewara
 * MIT Licensed
 */

'use strict';

/**
 * Load necessary packages.
 * 
 * @optional
 */

const fs = require('fs');

/**
 * Middleware logic & process.
 * 
 * In app.js
 * 
 * Format: middlewareName
 * 
 * Example: appjs.get('/', 'exampleController', 'exampleMiddleware);
 * 
 * @param {object} proto - System proto | vars & plugins
 *                         vars = system variables
 *                         plugins = registered plugins
 * @param {object} req - ExpressJS 'req' object
 * @param {object} res - ExpressJS 'res' object
 * @param {function} next - ExpressJS 'next' function
 */

module.exports = function (proto, req, res, next) {
  console.log('Hello, I am a middleware!');
  next();
};

/**
 * You can also use middleware's method.
 *
 * In app.js
 *
 * Format: middlewareName::middlewareMethod
 *
 * Example: appjs.get('/', 'exampleController', 'exampleMiddleware::myMethod)
 */

// exports.myMethod = function (proto, req, res, next) {
//   console.log('Hello, I am a middleware!');
//   next();
// };