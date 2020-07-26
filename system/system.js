/*!
 * system.js
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

/**
 * Default environment variables.
 */

var defaultPort = 3000;
var defaultServiceName = 'AyaPingPing JS';
var defaultEnvFilepath = '.env';
var defaultConfigFilepath = 'app.json';
var defaultControllerPath = 'controllers';
var defaultMiddlewarePath = 'middlewares';
var defaultConfig = {
  system_modules: {
    path: 'system/modules',
    use: [],
    config: {}
  },
  system_routers: {
    path: 'system/routers',
    use_before_app: [],
    use_after_app: [],
    config: {}
  }
};

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

appjs.get = function(endpoint, controller, middleware) {
  if (this.__proto.__group) {
    this.__proto.__stack.push({
      engine: 'appjs',
      method: 'get',
      endpoint: this.__proto.__group.endpoint + endpoint,
      controller: controller,
      middleware: this.__proto.__group.middleware || middleware
    });
  } else {
    this.__proto.__stack.push({
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

appjs.post = function(endpoint, controller, middleware) {
  if (this.__proto.__group) {
    this.__proto.__stack.push({
      engine: 'appjs',
      method: 'post',
      endpoint: this.__proto.__group.endpoint + endpoint,
      controller: controller,
      middleware: this.__proto.__group.middleware || middleware
    });
  } else {
    this.__proto.__stack.push({
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

appjs.put = function(endpoint, controller, middleware) {
  if (this.__proto.__group) {
    this.__proto.__stack.push({
      engine: 'appjs',
      method: 'put',
      endpoint: this.__proto.__group.endpoint + endpoint,
      controller: controller,
      middleware: this.__proto.__group.middleware || middleware
    });
  } else {
    this.__proto.__stack.push({
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

appjs.delete = function(endpoint, controller, middleware) {
  if (this.__proto.__group) {
    this.__proto.__stack.push({
      engine: 'appjs',
      method: 'delete',
      endpoint: this.__proto.__group.endpoint + endpoint,
      controller: controller,
      middleware: this.__proto.__group.middleware || middleware
    });
  } else {
    this.__proto.__stack.push({
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
 * @param {string|array|function} fnMidd - Middleware (striing|array) or executor (function)
 * @param {function|undefined} fnGroup - Executor | function(appjs) {}
 * @public
 */

appjs.group = function(endpoint, fnMidd, fnGroup) {
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

appjs.express = function(callback) {
  this.__proto.__stack.push({
    engine: 'express',
    callback: callback
  });
};

/**
 * Set or change proto __var value.
 * 
 * @param {string} name - proto __var [name]
 * @param {string} value - proto __var [name] value
 * @public
 */

appjs.set = function(name, value) {
  this.__proto.__var['__' + name] = value;
};

/**
 * Load env.
 * 
 * @param {string} path - Env file path
 * @public
 */

appjs.env = function(path) {
  dotenv.config({
    path: getEnvFilepath(path)
  });
};

/**
 * Load config.
 * 
 * @param {string} path - Config file path
 * @public
 */

appjs.config = function(path) {
  this.__proto.__configFilepath = getConfigFilepath(path);
  this.__proto.__config = getSystemConfig();
};

/**
 * Listen HTTP server & register all processes
 * inside the __proto.__stack.
 * 
 * @param {number|string} port - Listening port
 * @public
 */

appjs.listen = function(port) {
  this.__proto.__app = express();
  var appPort = getPort(port);
  var serviceName = getServiceName();
  (async function() {
    console.log('' + new Date());
    console.log('--------------------------------------------------');

    // Register system modules
    var regSystemModulesRes = await new Promise(registerSystemModules)
    .catch(function (err) {
      console.error(err.msg);
      console.error(err.err);
      throw new Error(err.err);
    });

    // Register system routers (before app routers)
    await new Promise(registerSystemRoutersBeforeApp)
    .catch(function (err) {
      console.error(err.msg);
      console.error(err.err);
      throw new Error(err.err);
    });

    // Register stack
    var regStackRes = await new Promise(registerStack)
    .catch(function (err) {
      console.error(err.msg);
      console.error(err.err);
      throw new Error(err.err);
    });

    // Register system routers (after app routers)
    var regSystemRoutersAfterAppRes = await new Promise(registerSystemRoutersAfterApp)
      .catch(function (err) {
        console.error(err.msg);
        console.error(err.err);
        throw new Error(err.err);
      });

    // Listener
    await new Promise(function(resolve) {
      appjs.__proto.__app.listen(appPort, function() {
        resolve();
      });
    }).catch(function (err) {
      console.error('[ ] Listener error!');
      console.error(err);
      throw new Error(err);
    });

    console.log(regSystemModulesRes);
    console.log(regSystemRoutersAfterAppRes);
    console.log(regStackRes);
    console.log('[*] ' + serviceName + ' started on port ' + appPort);
    console.log('--------------------------------------------------');
    console.log('Application is live! (example: http://localhost:' + appPort + ')');
    console.log(' \n');
  }().catch(function() {
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
  appjs.__proto.__config = defaultConfig;
  appjs.__proto.__mod = {};
  appjs.__proto.__stack = [];
  return appjs;
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
 * Get absolute file path of config.
 * 
 * @private
 */

function getConfigFilepath(configPath) {
  return path.join(getProjectRoot(), configPath || defaultConfigFilepath);
}

/**
 * Get absolute path of working controllers.
 * 
 * @private
 */

function getControllerPath(controllerPath) {
  return path.join(getProjectRoot(), 
    controllerPath || appjs.__proto.__var.__controllerPath || defaultControllerPath);
}

/**
 * Get absolute path of working middlewares.
 * 
 * @private
 */

function getMiddlewarePath(middlewarePath) {
  return path.join(getProjectRoot(),
    middlewarePath || appjs.__proto.__var.__middlewarePath || defaultMiddlewarePath);
}

/**
 * Get absolute path of system modules.
 * 
 * @private
 */

function getSystemModulesPath(systemModulesPath) {
  return path.join(getProjectRoot(), systemModulesPath || defaultConfig.system_modules.path);
}

/**
 * Get absolute path of system routers.
 * 
 * @private
 */

function getSystemRoutersPath(systemRoutersPath) {
  return path.join(getProjectRoot(), systemRoutersPath || defaultConfig.system_routers.path);
}

/**
 * Get system configuration.
 * 
 * @private
 */

function getSystemConfig() {
  var config = appjs.__proto.__configFilepath ? require(appjs.__proto.__configFilepath) : defaultConfig;
  if (!config) config = defaultConfig;
  if (!config.system_modules) config.system_modules = defaultConfig.system_modules;
  if (!config.system_modules.path) config.system_modules.path = defaultConfig.system_modules.path;
  if (!config.system_modules.use) config.system_modules.use = defaultConfig.system_modules.use;
  if (!config.system_modules.config) config.system_modules.config = defaultConfig.system_modules.config;
  if (!config.system_routers) config.system_routers = defaultConfig.system_routers;
  if (!config.system_routers.path) config.system_routers.path = defaultConfig.system_routers.path;
  if (!config.system_routers.use_before_app) config.system_routers.use_before_app = defaultConfig.system_routers.use_before_app;
  if (!config.system_routers.use_after_app) config.system_routers.use_after_app = defaultConfig.system_routers.use_after_app;
  if (!config.system_routers.config) config.system_routers.config = defaultConfig.system_routers.config;
  return config;
}

/**
 * Register single process of __proto.__stack.
 * 
 * @param {object} stack - Single __proto.__stack
 * @param {function} resolve 
 * @private
 */

function singleStackExecutor(stack, resolve) {
  if (!stack) return resolve();
  var proto = appjs.__proto;
  var app = appjs.__proto.__app;
  if (stack.engine === 'express') {
    stack.callback(proto.__mod, app);
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
            )[middlewareMethod](proto.__mod, req, res, next);
          });
        } else {
          f.push(function (req, res, next) {
            require(path.join(middlewarePath, middlewareName)
            )(proto.__mod, req, res, next);
          });
        }
        if (controllerMethod) {
          app[stack.method](stack.endpoint,
            f[0],
            function (req, res, next) {
              require(path.join(controllerPath, controllerName)
              )[controllerMethod](proto.__mod, req, res, next);
            }
          );
        } else {
          app[stack.method](stack.endpoint,
            f[0],
            function (req, res, next) {
              require(path.join(controllerPath, controllerName)
              )(proto.__mod, req, res, next);
            }
          );
        }
        resolve();
      } else if ((stack.middleware.constructor === Array &&
      stack.middleware.length && stack.middleware.length > 0) ||
      (typeof stack.middleware === 'object' && 
      stack.middleware.length && stack.middleware.length > 0)) {
        var f = [];
        stack.middleware.forEach(function(val) {
          var middleware = val.split('::');
          var middlewareName = middleware[0];
          var middlewareMethod = middleware[1];
          if (middlewareMethod) {
            f.push(function (req, res, next) {
              require(path.join(middlewarePath, middlewareName)
              )[middlewareMethod](proto.__mod, req, res, next);
            });
          } else {
            f.push(function (req, res, next) {
              require(path.join(middlewarePath, middlewareName)
              )(proto.__mod, req, res, next);
            });
          }
        });
        if (controllerMethod) {
          app[stack.method](stack.endpoint, f,
            function (req, res, next) {
              require(path.join(controllerPath, controllerName)
              )[controllerMethod](proto.__mod, req, res, next);
            }
          );
        } else {
          app[stack.method](stack.endpoint, f,
            function (req, res, next) {
              require(path.join(controllerPath, controllerName)
              )(proto.__mod, req, res, next);
            }
          );
        }
        resolve();
      } else {
        if (controllerMethod) {
          app[stack.method](stack.endpoint, function (req, res, next) {
            require(path.join(controllerPath, controllerName)
            )[controllerMethod](proto.__mod, req, res, next);
          });
        } else {
          app[stack.method](stack.endpoint, function (req, res, next) {
            require(path.join(controllerPath, controllerName)
            )(proto.__mod, req, res, next);
          });
        }
        resolve();
      }
    } else {
      if (controllerMethod) {
        app[stack.method](stack.endpoint, function (req, res, next) {
          require(path.join(controllerPath, controllerName)
          )[controllerMethod](proto.__mod, req, res, next);
        });
      } else {
        app[stack.method](stack.endpoint, function (req, res, next) {
          require(path.join(controllerPath, controllerName)
          )(proto.__mod, req, res, next);
        });
      }
      resolve();
    }
  }
}

/**
 * Register stack.
 * 
 * @param {function} resolve
 * @param {function} reject
 * @private
 */

function registerStack(resolve, reject) {
  var stackLength = appjs.__proto.__stack.length || 1;
  var stackEnd = (stackLength - 1);
  var stackIncrement = 0;
  repeator(0, function (repeat) {
    try {
      singleStackExecutor(appjs.__proto.__stack[stackIncrement],
      function () {
        if (stackIncrement === stackEnd) return repeat(false);
        stackIncrement++;
        repeat();
      });
    } catch (err) {
      reject({
        msg: '[ ] Stack error!',
        err: err
      });
    }
  }, function () {
    if (!appjs.__proto.__app._router || 
    (appjs.__proto.__app._router && 
    appjs.__proto.__app._router.stack.length < 1))
      return resolve('[ ] No route registered');
    var n = 0;
    appjs.__proto.__app._router.stack.forEach(function(val) {
      if (val.route && val.route.path) {
        n++;
      } else if (val.name === 'router') {
        if (val.handle && val.handle.stack && val.handle.stack.length > 0) {
          val.handle.stack.forEach(function(val2) {
            if (val2.route) n++;
          });
        }
      }
    });
    resolve('[*] ' + n + ' route(s) registered');
  });
}

/**
 * Register system modules.
 * 
 * @param {function} resolve
 * @param {function} reject
 * @private
 */

function registerSystemModules(resolve, reject) {
  var config = appjs.__proto.__config.system_modules;
  var modules = config.use;
  var l = modules.length;
  var n = 0;
  if (modules < 1) return resolve('[ ] No system module loaded');
  repeator(0, function(repeat) {
    try {
      if (n >= l) return repeat(false);
      require(path.join(getSystemModulesPath(config.path), modules[n] + '.js'))(
        {
          __var: appjs.__proto.__var,
          __mod: appjs.__proto.__mod
        },
        config.config[modules[n]] || {},
        function (resolveResult) {
          appjs.__proto.__mod[modules[n]] = resolveResult;
          n++;
          repeat();
        },
        function (rejectResult) {
          reject({
            msg: '[ ] System module error: ' + modules[n],
            err: rejectResult
          });
        }
      );
    } catch (err) {
      reject({
        msg: '[ ] System module error: ' + modules[n],
        err: err
      });
    }
  }, function() {
    resolve('[*] ' + l + ' system module(s) loaded');
  });
}

/**
 * Register system routers before app routers.
 * 
 * @param {function} resolve
 * @param {function} reject
 * @private
 */

function registerSystemRoutersBeforeApp(resolve, reject) {
  var config = appjs.__proto.__config.system_routers;
  var routers = config.use_before_app;
  var l = routers.length;
  var n = 0;
  appjs.__proto.__var.__totalLoadedSystemRouters = l;
  if (routers < 1) return resolve();
  repeator(0, function (repeat) {
    if (n >= l) return repeat(false);
    var router = routers[n].split('::');
    var routerName = router[0];
    var routerMethod = router[1];
    try {
      if (routerMethod) {
        require(path.join(getSystemRoutersPath(config.path), routerName + '.js'))
        [routerMethod](
          appjs.__proto.__app,
          {
            __var: appjs.__proto.__var,
            __mod: appjs.__proto.__mod
          },
          config.config[routerName] || {},
          function () {
            n++;
            repeat();
          },
          function (rejectResult) {
            reject({
              msg: '[ ] System router error: ' + routerName,
              err: rejectResult
            });
          }
        );
      } else {
        require(path.join(getSystemRoutersPath(config.path), routerName + '.js'))(
          appjs.__proto.__app,
          {
            __var: appjs.__proto.__var,
            __mod: appjs.__proto.__mod
          },
          config.config[routerName] || {},
          function () {
            n++;
            repeat();
          },
          function (rejectResult) {
            reject({
              msg: '[ ] System router error: ' + routerName,
              err: rejectResult
            });
          }
        );
      }
    } catch (err) {
      reject({
        msg: '[ ] System router error: ' + routerName,
        err: err
      });
    }
  }, function () {
    resolve();
  });
}

/**
 * Register system routers after app routers.
 * 
 * @param {function} resolve
 * @param {function} reject
 * @private
 */

function registerSystemRoutersAfterApp(resolve, reject) {
  var config = appjs.__proto.__config.system_routers;
  var routers = config.use_after_app;
  var l = routers.length;
  var n = 0;
  appjs.__proto.__var.__totalLoadedSystemRouters = 
    appjs.__proto.__var.__totalLoadedSystemRouters + l;
  if (appjs.__proto.__var.__totalLoadedSystemRouters < 1) 
    return resolve('[ ] No system router loaded');
  if (routers < 1) return resolve('[*] ' + 
    appjs.__proto.__var.__totalLoadedSystemRouters + ' system router(s) loaded');
  repeator(0, function (repeat) {
    if (n >= l) return repeat(false);
    var router = routers[n].split('::');
    var routerName = router[0];
    var routerMethod = router[1];
    try {
      if (routerMethod) {
        require(path.join(getSystemRoutersPath(config.path), routerName + '.js'))
        [routerMethod](
          appjs.__proto.__app,
          {
            __var: appjs.__proto.__var,
            __mod: appjs.__proto.__mod
          },
          config.config[routerName] || {},
          function () {
            n++;
            repeat();
          },
          function (rejectResult) {
            reject({
              msg: '[ ] System router error: ' + routerName,
              err: rejectResult
            });
          }
        );
      } else {
        require(path.join(getSystemRoutersPath(config.path), routerName + '.js'))(
          appjs.__proto.__app,
          {
            __var: appjs.__proto.__var,
            __mod: appjs.__proto.__mod
          },
          config.config[routerName] || {},
          function () {
            n++;
            repeat();
          },
          function (rejectResult) {
            reject({
              msg: '[ ] System router error: ' + routerName,
              err: rejectResult
            });
          }
        );
      }
    } catch (err) {
      reject({
        msg: '[ ] System router error: ' + routerName,
        err: err
      });
    }
  }, function () {
    return resolve('[*] ' +
      appjs.__proto.__var.__totalLoadedSystemRouters + ' system router(s) loaded');
  });
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
    var ii = setInterval(function() {
      clearInterval(ii);
      func(function(r) {
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