'use strict';

/**
 * Main module.
 * 
 * @param {object} mod - Loaded system modules
 * @param {object} req - ExpressJS 'req' object
 * @param {object} res - ExpressJS 'res' object
 * @param {function} next - ExpressJS 'next' function
 */

module.exports = function (mod, req, res, next) {
  console.log('Hi, I am from middlewares/exampleMiddleware.js');
  next();
};

/**
 * Another example, you can use middleware's method
 * as main module.
 *
 * In app.js -> middlewareName::middlewareMethod
 * 
 * Example: 
 * appjs.get('/', 'exampleController', 'exampleMiddleware::myMethod');
 */

// exports.myMethod = function (mod, req, res, next) {
//   console.log('Hi, I am from middlewares/exampleMiddleware.js');
//   next();
// };