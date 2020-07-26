/*!
 * app.example.js
 * Copyright(c) 2018-2020 Dali Kewara
 * MIT Licensed
 */

'use strict';

/**
 * Import & initialize appjs system.
 * 
 * REQUIRED.
 */

const appjs = require('./system/system.js')(__dirname);

/**
 * Load necessary functions.
 * 
 * OPTIONAL.
 */

// You may need this couple functions (recommended)
appjs.env(); // Load .env
appjs.config(); // Load system config (config.json)

/**
 * Routing example.
 * 
 * appjs[method](endpoint, controller, middlewares);
 * 
 * OPTIONAL.
 */

// No controller route will send an empty response
appjs.get('/');

// Any request to this route is handled by
// 'exampleController.js' in the 'controllers' directory
appjs.get('/', 'exampleController');

// Any request to this route is handled by
// 'example' method of 'exampleController.js' in the 'controllers' directory
appjs.get('/', 'exampleController::example');

// kbj
appjs.get('/', 'exampleController', 'exampleMiddleware');

appjs.get('/example4', 'exampleController', 'exampleMiddleware2::example');
appjs.get('/example5', 'exampleController', [
  'exampleMiddleware', 'exampleMiddleware2::example'
]);

// appjs.group('/profile', 'sessionMiddleware', appjs => {
//   // 'sessionMiddleware' applied to all routes in here
//   appjs.post('/get', 'profileController::get'); // POST /profile/get
//   appjs.post('/add', 'profileController::add'); // POST /profile/add
//   appjs.post('/edit', 'profileController::edit'); // POST /profile/edit
//   appjs.post('/delete', 'profileController::delete'); // POST /profile/delete
// });

// appjs.post('/some-routes');

// appjs.express((mod, app) => {
//   app.get('/express-get', (req, res, next) => {
//     res.send('Hi, I am Express-get');
//   });
//   app.post('/express-post', (req, res, next) => {
//     res.send('Hi, I am Express-post');
//   });
// });

/**
 * Start & listen for http connections.
 *
 * REQUIRED.
 */
appjs.listen();