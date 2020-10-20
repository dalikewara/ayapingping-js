/*!
 * appjs.js
 * Powered & inspired by ExpressJS.
 * Copyright(c) 2018-2020 Dali Kewara
 * MIT Licensed
 */

'use strict';

/**
 * Load necessary packages.
 */

var path = require('path');
var dotenv = require('dotenv');
var express = require('express');
var fs = require('fs');

/**
 * Default environment variables.
 */

var defaultPort = 3000;
var defaultServiceName = 'AyaPingPing JS';
var defaultEnvFilepath = '.env';
var defaultControllerPath = 'controllers';
var defaultMiddlewarePath = 'middlewares';
var defaultLibPath = '';
var defaultPluginPath = 'plugins';

/**
 * Main module.
 * 
 * @public
 */

var appjs = exports = module.exports = createApplication;

/**
 * Push route with GET method into __stack.
 * 
 * @param {string} endpoint - Endpoint
 * @param {string} controller - Controller filepath
 * @param {string|array} middleware - Middleware filepath
 * @public
 */

appjs.get = function (endpoint, controller, middleware) {
  if (this.__proto.__group) {
    this.__proto.__stack.push({
      type: 'route',
      engine: 'appjs',
      method: 'get',
      endpoint: this.__proto.__group.endpoint + endpoint,
      controller: controller,
      middleware: this.__proto.__group.middleware || middleware
    });
  } else {
    this.__proto.__stack.push({
      type: 'route',
      engine: 'appjs',
      method: 'get',
      endpoint: endpoint,
      controller: controller,
      middleware: middleware
    });
  }
};

/**
 * Push route with POST method into __proto.__stack.
 * 
 * @param {string} endpoint - Endpoint
 * @param {string} controller - Controller filepath
 * @param {string|array} middleware - Middleware filepath
 * @public
 */

appjs.post = function (endpoint, controller, middleware) {
  if (this.__proto.__group) {
    this.__proto.__stack.push({
      type: 'route',
      engine: 'appjs',
      method: 'post',
      endpoint: this.__proto.__group.endpoint + endpoint,
      controller: controller,
      middleware: this.__proto.__group.middleware || middleware
    });
  } else {
    this.__proto.__stack.push({
      type: 'route',
      engine: 'appjs',
      method: 'post',
      endpoint: endpoint,
      controller: controller,
      middleware: middleware
    });
  }
};

/**
 * Push route with PUT method into __proto.__stack.
 * 
 * @param {string} endpoint - Endpoint
 * @param {string} controller - Controller filepath
 * @param {string|array} middleware - Middleware filepath
 * @public
 */

appjs.put = function (endpoint, controller, middleware) {
  if (this.__proto.__group) {
    this.__proto.__stack.push({
      type: 'route',
      engine: 'appjs',
      method: 'put',
      endpoint: this.__proto.__group.endpoint + endpoint,
      controller: controller,
      middleware: this.__proto.__group.middleware || middleware
    });
  } else {
    this.__proto.__stack.push({
      type: 'route',
      engine: 'appjs',
      method: 'put',
      endpoint: endpoint,
      controller: controller,
      middleware: middleware
    });
  }
};

/**
 * Push route with DELETE method into __proto.__stack.
 * 
 * @param {string} endpoint - Endpoint
 * @param {string} controller - Controller filepath
 * @param {string|array} middleware - Middleware filepath
 * @public
 */

appjs.delete = function (endpoint, controller, middleware) {
  if (this.__proto.__group) {
    this.__proto.__stack.push({
      type: 'route',
      engine: 'appjs',
      method: 'delete',
      endpoint: this.__proto.__group.endpoint + endpoint,
      controller: controller,
      middleware: this.__proto.__group.middleware || middleware
    });
  } else {
    this.__proto.__stack.push({
      type: 'route',
      engine: 'appjs',
      method: 'delete',
      endpoint: endpoint,
      controller: controller,
      middleware: middleware
    });
  }
};

/**
 * Push group of routes into __proto.__stack.
 * 
 * @param {string} endpoint - Endpoint
 * @param {string|array|function} fnMidd - Middleware (string|array) or executor (function)
 * @param {function|undefined} fnGroup - Executor | function(appjs) {}
 * @public
 */

appjs.group = function (endpoint, fnMidd, fnGroup) {
  this.__proto.__group = {};
  this.__proto.__group.endpoint = endpoint;
  if (fnMidd && ((typeof fnMidd === 'string' ||
    fnMidd.constructor === String) ||
    ((fnMidd.constructor === Array &&
      fnMidd.length && fnMidd.length > 0) ||
      (typeof fnMidd === 'object' &&
        fnMidd.length && fnMidd.length > 0)))) {
    this.__proto.__group.middleware = fnMidd;
    fnGroup(this);
    this.__proto.__group = null;
  } else {
    this.__proto.__group.middleware = null;
    fnMidd(this);
    this.__proto.__group = null;
  }
};

/**
 * Push route with ExpressJS mechanism into __proto.__stack.
 * 
 * @param {function} callback - function(APP, app) {}
 * @public
 */

appjs.express = function (callback) {
  this.__proto.__stack.push({
    type: 'route',
    engine: 'express',
    callback: callback
  });
};

/**
 * Push command into __proto.__stack to load plugins.
 * 
 * @param {string|array} name - plugin name
 * @param {string|object|number|boolean} option - plugin option
 * @public
 */

appjs.load = function (name, option) {
  this.__proto.__stack.push({
    type: 'plugin',
    engine: 'appjs',
    name: name,
    option: option
  });
};

/**
 * Push command into __proto.__stack to set or change proto __var value.
 * 
 * @param {string} name - proto __var [name]
 * @param {string} value - proto __var [name] value
 * @public
 */

appjs.set = function (name, value) {
  this.__proto.__stack.push({
    type: 'set',
    engine: 'appjs',
    name: name,
    value: value
  });
};

/**
 * Push command into __proto.__stack to load env.
 * 
 * @param {string} path - Env file path
 * @public
 */

appjs.env = function (path) {
  this.__proto.__stack.push({
    type: 'env',
    engine: 'appjs',
    path: path
  });
};

/**
 * Listen HTTP server & run all processes
 * inside the __proto.__stack.
 * 
 * @param {number|string} port - Listening port
 * @public
 */

appjs.listen = function (port) {
  this.__proto.__app = express();
  (async function () {
    console.log('' + new Date());
    console.log('--------------------------------------------------');
    var runStackRes = await new Promise(runStack)
      .catch(function (err) {
        console.error(err.msg);
        console.error(err.err);
        throw new Error(err.err);
      });
    var appPort = getPort(port);
    await new Promise(function (resolve) {
      appjs.__proto.__app.listen(appPort, function () {
        resolve();
      });
    }).catch(function (err) {
      console.error('[ ] Listener error!');
      console.error(err);
      throw new Error(err);
    });
    var serviceName = getServiceName();
    console.log(runStackRes);
    console.log('[*] ' + serviceName + ' started on port ' + appPort);
    console.log('--------------------------------------------------');
    console.log('Application is live! (example: http://localhost:' + appPort + ')');
    console.log(' \n');
  }().catch(function () {
    console.error('--------------------------------------------------');
    console.error('Application failed to start!');
    console.error(' \n');
  }));
};

/**
 * Initialize & create app methods.
 * 
 * @private
 */

function createApplication(projectRoot) {
  appjs.__proto = {};
  appjs.__proto.__app = {};
  appjs.__proto.__var = {};
  appjs.__proto.__var.__projectRoot = getProjectRoot(projectRoot);
  appjs.__proto.__plugins = {};
  appjs.__proto.__stack = [];
  return appjs;
}

/**
 * Get public proto.
 *
 * @private
 */

function getPublicProto() {
  return {
    vars: appjs.__proto.__var,
    plugins: appjs.__proto.__plugins
  }
}

/**
 * Get listening port.
 * 
 * @private
 */

function getPort(port) {
  return port || appjs.__proto.__var.__port || process.env.PORT || defaultPort;
}

/**
 * Get service name.
 * 
 * @private
 */

function getServiceName(serviceName) {
  return serviceName || appjs.__proto.__var.__serviceName ||
    process.env.SERVICE_NAME || defaultServiceName;
}

/**
 * Get absolute root path of app project.
 * 
 * @private
 */

function getProjectRoot(projectRoot) {
  return projectRoot || appjs.__proto.__var.__projectRoot || process.cwd();
}

/**
 * Get absolute file path of .env.
 * 
 * @private
 */

function getEnvFilepath(envPath) {
  return path.join(getProjectRoot(), envPath || defaultEnvFilepath);
}

/**
 * Get absolute path of controllers.
 * 
 * @private
 */

function getControllerPath(controllerPath) {
  return path.join(getProjectRoot(),
    controllerPath || appjs.__proto.__var.__controllerPath || defaultControllerPath);
}

/**
 * Get absolute path of middlewares.
 * 
 * @private
 */

function getMiddlewarePath(middlewarePath) {
  return path.join(getProjectRoot(),
    middlewarePath || appjs.__proto.__var.__middlewarePath || defaultMiddlewarePath);
}

/**
 * Get absolute path of lib.
 * 
 * @private
 */

function getLibPath(libPath) {
  return path.join(__dirname, libPath || defaultLibPath);
}

/**
 * Get absolute path of plugins.
 * 
 * @private
 */

function getPluginPath(pluginPath) {
  return path.join(getProjectRoot(),
    pluginPath || appjs.__proto.__var.__pluginPath || defaultPluginPath);
}

/**
 * Run single stack with 'set' type.
 * 
 * @param {object} stack - Single __proto.__stack
 * @param {function} resolve 
 * @private
 */

function singleSetStack(stack, resolve) {
  if (!stack || (stack && stack.type !== 'set')) return resolve();
  appjs.__proto.__var['__' + stack.name] = stack.value;
  resolve();
}

/**
 * Run single stack with 'env' type.
 * 
 * @param {object} stack - Single __proto.__stack
 * @param {function} resolve 
 * @private
 */

function singleEnvStack(stack, resolve) {
  if (!stack || (stack && stack.type !== 'env')) return resolve();
  dotenv.config({
    path: getEnvFilepath(stack.path)
  });
  resolve();
}

/**
 * Run single stack with 'plugin' type.
 * 
 * @param {object} stack - Single __proto.__stack
 * @param {function} resolve 
 * @private
 */

function singlePluginStack(stack, resolve) {
  if (!stack || (stack && stack.type !== 'plugin')) return resolve();
  (async function () {
    var libPath = getLibPath();
    var pluginPath = getPluginPath();
    var pluginPaths = {
      libs: [],
      plugins: []
    };
    await new Promise(function (resolve, reject) {
      fs.readdir(libPath, function(err, files) {
        if (!err && files.length > 0) {
          files.forEach(function(file) {
            if (file.split('.').reverse()[0] === 'js') {
              pluginPaths.libs.push(file);
            }
          });
          resolve();
        } else {
          resolve();
        }
      });
    }).catch(function (err) {
      console.error(err);
      throw new Error(err);
    });
    await new Promise(function (resolve, reject) {
      fs.readdir(pluginPath, function(err, files) {
        if (!err && files.length > 0) {
          files.forEach(function(file) {
            if (file.split('.').reverse()[0] === 'js') {
              pluginPaths.plugins.push(file);
            }
          });
          resolve();
        } else {
          resolve();
        }
      });
    }).catch(function (err) {
      console.error(err);
      throw new Error(err);
    });
    await new Promise(function (resolve, reject) {
      var name = stack.name;
      if (name.split('.').reverse()[0] !== 'js') name = name + '.js';
      var pth = null;
      pluginPaths.plugins.forEach(function(nm) {
        if (nm === name) {
          pth = path.join(pluginPath, name);
        }
      });
      pluginPaths.libs.forEach(function (nm) {
        if (!pth) {
          if (nm === name) {
            pth = path.join(libPath, name);
          }
        }
      });
      if (!pth) return reject('No plugin called \'' + stack.name + '\'');
      process.appjsPlgOpt = {};
      if (stack.option !== undefined) process.appjsPlgOpt = stack.option;
      require(pth)(
        appjs.__proto.__app,
        getPublicProto(),
        function (resolveResult) {
          if (resolveResult === undefined) resolveResult = null;
          appjs.__proto.__plugins[stack.name] = resolveResult;
          resolve();
        },
        function (rejectResult) {
          reject({
            msg: 'Plugin error: ' + stack.name,
            err: rejectResult
          });
        }
      );
    }).catch(function (err) {
      console.error(err);
      throw new Error(err);
    });
    resolve()
  }().catch(function () {}));
}

/**
 * Run single stack with 'route' type.
 * 
 * @param {object} stack - Single __proto.__stack
 * @param {function} resolve 
 * @private
 */

function singleRouteStack(stack, resolve) {
  if (!stack || (stack && stack.type !== 'route')) return resolve();
  var proto = appjs.__proto;
  var app = appjs.__proto.__app;
  if (stack.engine === 'express') {
    stack.callback(getPublicProto(), app);
    resolve();
  } else if (stack.engine === 'appjs') {
    if (!stack.controller) {
      app[stack.method](stack.endpoint,
        function (req, res, next) {
          res.send();
        }
      );
      return resolve();
    }
    var controllerPath = getControllerPath();
    var middlewarePath = getMiddlewarePath();
    var controller = stack.controller.split('::');
    var controllerName = controller[0];
    var controllerMethod = controller[1];
    if (stack.middleware) {
      if (typeof stack.middleware === 'string' ||
        stack.middleware.constructor === String) {
        var middleware = stack.middleware.split('::');
        var middlewareName = middleware[0];
        var middlewareMethod = middleware[1];
        var f = [];
        if (middlewareMethod) {
          f.push(function (req, res, next) {
            require(path.join(middlewarePath, middlewareName)
            )[middlewareMethod](getPublicProto(), req, res, next);
          });
        } else {
          f.push(function (req, res, next) {
            require(path.join(middlewarePath, middlewareName)
            )(getPublicProto(), req, res, next);
          });
        }
        if (controllerMethod) {
          app[stack.method](stack.endpoint,
            f[0],
            function (req, res, next) {
              require(path.join(controllerPath, controllerName)
              )[controllerMethod](getPublicProto(), req, res, next);
            }
          );
        } else {
          app[stack.method](stack.endpoint,
            f[0],
            function (req, res, next) {
              require(path.join(controllerPath, controllerName)
              )(getPublicProto(), req, res, next);
            }
          );
        }
        resolve();
      } else if ((stack.middleware.constructor === Array &&
        stack.middleware.length && stack.middleware.length > 0) ||
        (typeof stack.middleware === 'object' &&
          stack.middleware.length && stack.middleware.length > 0)) {
        var f = [];
        stack.middleware.forEach(function (val) {
          var middleware = val.split('::');
          var middlewareName = middleware[0];
          var middlewareMethod = middleware[1];
          if (middlewareMethod) {
            f.push(function (req, res, next) {
              require(path.join(middlewarePath, middlewareName)
              )[middlewareMethod](getPublicProto(), req, res, next);
            });
          } else {
            f.push(function (req, res, next) {
              require(path.join(middlewarePath, middlewareName)
              )(getPublicProto(), req, res, next);
            });
          }
        });
        if (controllerMethod) {
          app[stack.method](stack.endpoint, f,
            function (req, res, next) {
              require(path.join(controllerPath, controllerName)
              )[controllerMethod](getPublicProto(), req, res, next);
            }
          );
        } else {
          app[stack.method](stack.endpoint, f,
            function (req, res, next) {
              require(path.join(controllerPath, controllerName)
              )(getPublicProto(), req, res, next);
            }
          );
        }
        resolve();
      } else {
        if (controllerMethod) {
          app[stack.method](stack.endpoint, function (req, res, next) {
            require(path.join(controllerPath, controllerName)
            )[controllerMethod](getPublicProto(), req, res, next);
          });
        } else {
          app[stack.method](stack.endpoint, function (req, res, next) {
            require(path.join(controllerPath, controllerName)
            )(getPublicProto(), req, res, next);
          });
        }
        resolve();
      }
    } else {
      if (controllerMethod) {
        app[stack.method](stack.endpoint, function (req, res, next) {
          require(path.join(controllerPath, controllerName)
          )[controllerMethod](getPublicProto(), req, res, next);
        });
      } else {
        app[stack.method](stack.endpoint, function (req, res, next) {
          require(path.join(controllerPath, controllerName)
          )(getPublicProto(), req, res, next);
        });
      }
      resolve();
    }
  }
}

/**
 * Run all processes inside __proto.__stack.
 * 
 * @param {function} resolve
 * @param {function} reject
 * @private
 */

function runStack(resolve, reject) {
  var stackLength = appjs.__proto.__stack.length || 1;
  var stackEnd = (stackLength - 1);
  var stackIncrement = 0;
  repeator(0, function (repeat) {
    try {
      var currentStack = appjs.__proto.__stack[stackIncrement];
      switch (currentStack.type) {
        case 'env':
          singleEnvStack(currentStack, function () {
            if (stackIncrement === stackEnd) return repeat(false);
            stackIncrement++;
            repeat();
          });
          break;
        case 'set':
          singleSetStack(currentStack, function () {
            if (stackIncrement === stackEnd) return repeat(false);
            stackIncrement++;
            repeat();
          });
          break;
        case 'plugin':
          singlePluginStack(currentStack, function () {
            if (stackIncrement === stackEnd) return repeat(false);
            stackIncrement++;
            repeat();
          });
          break;
        case 'route':
          singleRouteStack(currentStack, function () {
            if (stackIncrement === stackEnd) return repeat(false);
            stackIncrement++;
            repeat();
          });
          break;
        default:
          if (stackIncrement === stackEnd) return repeat(false);
          stackIncrement++;
          repeat();
          break;
      }
    } catch (err) {
      reject({
        msg: '[ ] Stack error!',
        err: err
      });
    }
  }, function () {
    var stackInfo = '';
    (async function () {
      var loadedPlugins = await new Promise(getLoadedPlugins)
        .catch(function (err) {
          return '';
        });
      var registeredRoutes = await new Promise(getRegisteredRoutes)
        .catch(function (err) {
          return '';
        });
      stackInfo = stackInfo + loadedPlugins + '\n';
      stackInfo = stackInfo + registeredRoutes + '\n';
      resolve(stackInfo);
    }().catch(function () {
      resolve(stackInfo);
    }));
  });
}

/**
 * Get loaded plugins.
 * 
 * @param {function} resolve
 * @param {function} reject
 * @private
 */

function getLoadedPlugins(resolve, reject) {
  var len = Object.keys(appjs.__proto.__plugins).length;
  if (len < 1) return resolve('');
  resolve('[*] ' + len + ' plugin(s) loaded');
}

/**
 * Get registered routes.
 * 
 * @param {function} resolve
 * @param {function} reject
 * @private
 */

function getRegisteredRoutes(resolve, reject) {
  if (!appjs.__proto.__app._router ||
    (appjs.__proto.__app._router &&
      appjs.__proto.__app._router.stack.length < 1))
    return resolve('[ ] No route registered');
  var n = 0;
  appjs.__proto.__app._router.stack.forEach(function (val) {
    if (val.route && val.route.path) {
      n++;
    } else if (val.name === 'router') {
      if (val.handle && val.handle.stack && val.handle.stack.length > 0) {
        val.handle.stack.forEach(function (val2) {
          if (val2.route) n++;
        });
      }
    }
  });
  resolve('[*] ' + n + ' route(s) registered');
}

/**
 * Function to repeat a process.
 * 
 * @param {number} delay - Repeat delay
 * @param {function} func - Repeated function
 * @param {function} callback - After it finished to repeat
 * @private
 */

function repeator(delay, func, callback) {
  function executor() {
    var i = Number(delay) || 0;
    var ii = setInterval(function () {
      clearInterval(ii);
      func(function (r) {
        if (r == false) {
          if (callback) return callback(r);
        } else {
          executor();
        }
      });
    }, i);
  };
  executor();
}