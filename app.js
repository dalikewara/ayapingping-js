'use strict';

/**
 * Initialization.
 */

const appjs = require('./index.js')(__dirname);

appjs.env();

/**
 * Plugins.
 */

// appjs.load(pluginName, pluginOption);

/**
 * Routes.
 */

appjs.get('/example', 'exampleController');

/**
 * Listen the app.
 */

appjs.listen();