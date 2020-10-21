'use strict';

/**
 * Load necessary packages.
 * 
 * @optional
 */

const fs = require('fs');

/**
 * Controller logic & process.
 * 
 * In app.js
 * 
 * Format: controllerName
 * 
 * Example: appjs.get('/', 'exampleController');
 * 
 * @param {object} proto - System proto | vars & plugins
 *                         vars = system variables
 *                         plugins = registered plugins
 * @param {object} req - ExpressJS 'req' object
 * @param {object} res - ExpressJS 'res' object
 * @param {function} next - ExpressJS 'next' function
 */

module.exports = function (proto, req, res, next) {
  res.send('Hello world!');
};

/**
 * You can also use controller's method.
 *
 * In app.js
 *
 * Format: controllerName::controllerMethod
 *
 * Example: appjs.get('/', 'exampleController::myMethod')
 */

// exports.myMethod = function (proto, req, res, next) {
//   res.send('Hello world!');
// };