'use strict';

/**
 * Main module.
 * 
 * @param {object} mod - Loaded system modules
 * @param {object} req - ExpressJS 'req' object
 * @param {object} res - ExpressJS 'res' object
 * @param {function} next - ExpressJS 'next' function
 */

module.exports = function(mod, req, res, next) {
  res.send('Hi, I am ' + req.originalUrl);
};

/**
 * Another example, you can use controller's method 
 * as main module.
 * 
 * In app.js -> controllerName::controllerMethod
 * 
 * Example:
 * appjs.get('/', 'exampleController::myMethod');
 */

// exports.myMethod = function (mod, req, res, next) {
//   res.send('Hi, I am ' + req.originalUrl);
// };