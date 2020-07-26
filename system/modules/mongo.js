/*!
 * mongo.js
 * Copyright(c) 2018-2020 Dali Kewara
 * MIT Licensed
 */

'use strict';

/**
 * Load necessary packages.
 */

var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');

/**
 * Default environment variables.
 */

var defaultEnv = {
  host: process.env.MONGO_HOST || '127.0.0.1',
  port: process.env.MONGO_PORT || '27017',
  name: process.env.MONGO_NAME || '',
};

/**
 * Default configuration variables.
 */

var defaultConfig = {
  modelPath: 'models/mongo',
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

/**
 * Main module.
 * 
 * Value or data passed on 'resolve()' will be stored into system proto __mod.
 * 
 * @param {object} proto - System proto variables | __var & __mod
 * @param {object} config - This module configuration | from config.json
 * @param {function} resolve - resolve | if done & ok | resolve('my val');
 * @param {function} reject - reject | if error | reject(err);
 * @public
 */

module.exports = function(proto, config, resolve, reject) {
  var projectRoot = proto.__var.__projectRoot;
  var options = {
    useCreateIndex: config.useCreateIndex || defaultConfig.useCreateIndex,
    useNewUrlParser: config.useNewUrlParser || defaultConfig.useNewUrlParser,
    useFindAndModify: config.useFindAndModify || defaultConfig.useFindAndModify,
    useUnifiedTopology: config.useUnifiedTopology || defaultConfig.useUnifiedTopology,
  };
  mongoose.connect('mongodb://' + defaultEnv.host + ':' + defaultEnv.port + '/' + 
  defaultEnv.name, options).catch(function(err) {
    reject(err);
  });
  mongoose.connection.once('open', function() {
    var mongoModelPath = path.join(projectRoot, config.modelPath || defaultConfig.modelPath);
    if (fs.existsSync(mongoModelPath)) {
      fs.readdir(mongoModelPath, function(err, files) {
        if (err) return reject(err);
        var modelList = files.filter(function(model) {
          return model.match('.js');
        });
        var models = {};
        modelList.forEach(function(model) {
          var Model = require(path.join(mongoModelPath, model));
          var modelName = model.replace('.js', '');
          models[modelName] = Model(mongoose);
        });
        console.log('[*] Mongo connected with ' + Object.keys(models).length + ' model(s)');
        resolve({
          connection: mongoose,
          models: models
        });
      });
    } else {
      console.log('[*] Mongo connected with no model');
      resolve({
        connection: mongoose,
        models: {}
      });
    }
  });
};
