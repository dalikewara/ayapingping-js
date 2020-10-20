/*!
 * examplePlugin.js
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
 * Default environment.
 * Change this value in .env.
 * 
 * > MY_VALUE=new value
 * 
 * @optional
 */

const defaultEnv = {
  MY_VALUE: process.env.MY_VALUE || 'my value'
};

/**
 * Default option.
 * Change this value by passing option parameter when
 * loading the plugin.
 * 
 * Format: appjs.load(pluginName, pluginOption)
 * 
 * > appjs.load('example', { myKey: 'new value' })
 * 
 * @optional
 */

const defaultOption = {
  myKey: process.appjsPlgOpt.myKey || 'my value'
};

/**
 * Plugin logic & process.
 * 
 * This plugin will be registered & stored into system proto 
 * (proto.plugins) as an object.
 * 
 * proto: {
 *  plugins: {
 *    'pluginName': null
 *  }
 * }
 * 
 * All registered or loaded plugins is saved into system proto
 * (proto.plugins) as an object. 
 * 
 * proto: {
 *  plugins: {
 *    'pluginName': null,
 *    'pluginName': null,
 *    ...
 *  }
 * }
 * 
 * You can give a value into the plugin's object by passing
 * it in resolve function. 
 * 
 * Format: resolve(result)
 * 
 * Example: resolve({key: 'value'})
 * 
 * Result:
 * 
 * proto: {
 *  plugins: {
 *    'pluginName': {
 *      key: 'value'
 *    }
 *  }
 * }
 * 
 * You can also access the system proto variable in 
 * the controllers or middlewares.
 * 
 * @param {object} app - ExpressJS application-level
 * @param {object} proto - System proto | vars & plugins
 *                         vars = system variables
 *                         plugins = registered plugins
 * @param {function} resolve - resolve | if done (ok)
 *                             resolve();
 *                             or
 *                             resolve(result);
 * @param {function} reject - reject | if error
 *                            reject(err)
 * 
 * @required
 */

module.exports = function (app, proto, resolve, reject) {
  resolve('Your first plugin!');
};