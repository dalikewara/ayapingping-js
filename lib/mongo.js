/*!
 * mongo.js
 * Copyright(c) 2018-2020 Dali Kewara
 * MIT Licensed
 */

'use strict';

var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');

var defaultEnv = {
  MONGO_HOST: process.env.MONGO_HOST || '127.0.0.1',
  MONGO_PORT: process.env.MONGO_PORT || '27017',
  MONGO_NAME: process.env.MONGO_NAME || '',
};

var defaultOption = {
  modelPath: process.appjsPlgOpt.modelPath || 'models/mongo',
  useCreateIndex: process.appjsPlgOpt.useCreateIndex || true,
  useNewUrlParser: process.appjsPlgOpt.useNewUrlParser || true,
  useFindAndModify: process.appjsPlgOpt.useFindAndModify || false,
  useUnifiedTopology: process.appjsPlgOpt.useUnifiedTopology || true
};

module.exports = function (app, proto, resolve, reject) {
  var projectRoot = proto.vars.__projectRoot;
  var options = {
    useCreateIndex: defaultOption.useCreateIndex,
    useNewUrlParser: defaultOption.useNewUrlParser,
    useFindAndModify: defaultOption.useFindAndModify,
    useUnifiedTopology: defaultOption.useUnifiedTopology
  };
  mongoose.connect('mongodb://' + defaultEnv.MONGO_HOST + ':' + defaultEnv.MONGO_PORT + '/' + 
  defaultEnv.MONGO_NAME, options).catch(function(err) {
    reject(err);
  });
  mongoose.connection.once('open', function () {
    var mongoModelPath = path.join(projectRoot, defaultOption.modelPath);
    if (fs.existsSync(mongoModelPath)) {
      fs.readdir(mongoModelPath, function (err, files) {
        if (err) return reject(err);
        var modelList = files.filter(function (model) {
          return model.match('.js');
        });
        var models = {};
        modelList.forEach(function (model) {
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
      console.log('[*] Mongo connected');
      resolve({
        connection: mongoose,
        models: {}
      });
    }
  });
};