/*!
 * mysql.js
 * Copyright(c) 2018-2020 Dali Kewara
 * MIT Licensed
 */

'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');

var defaultEnv = {
  MYSQL_HOST: process.env.MYSQL_HOST || '127.0.0.1',
  MYSQL_PORT: process.env.MYSQL_PORT || '3306',
  MYSQL_NAME: process.env.MYSQL_NAME || 'test',
  MYSQL_USER: process.env.MYSQL_USER || 'root',
  MYSQL_PASS: process.env.MYSQL_PASS || '',
  MYSQL_PRODUCTION_LOGGING: (process.env.MYSQL_PRODUCTION_LOGGING === 'false') ? false : logging,
};

var defaultOption = {
  modelPath: process.appjsPlgOpt.modelPath || 'models/mysql',
  poolMin: process.appjsPlgOpt.poolMin || 0,
  poolMax: process.appjsPlgOpt.poolMax || 50,
  poolIdle: process.appjsPlgOpt.poolIdle || 1,
  poolAcquire: process.appjsPlgOpt.poolAcquire || 2000000000,
  poolEvict: process.appjsPlgOpt.poolEvict || 2000000000,
  dialect: process.appjsPlgOpt.dialect || 'mysql',
  dialectConnectTimeout: process.appjsPlgOpt.dialectConnectTimeout || 2000000000,
  handleDisconnects: process.appjsPlgOpt.handleDisconnects || true,
  timestamps: process.appjsPlgOpt.timestamps || false,
  paranoid: process.appjsPlgOpt.paranoid || true,
  freezeTableName: process.appjsPlgOpt.freezeTableName || true
};

module.exports = function (app, proto, resolve, reject) {
  var projectRoot = proto.vars.__projectRoot;
  var mysqlPool = {
    min: defaultOption.poolMin,
    max: defaultOption.poolMax,
    idle: defaultOption.poolIdle,
    acquire: defaultOption.poolAcquire,
    evict: defaultOption.poolEvict,
    handleDisconnects: defaultOption.handleDisconnects,
  };
  var mysqlDefine = {
    timestamps: defaultOption.timestamps,
    paranoid: defaultOption.paranoid,
    freezeTableName: defaultOption.freezeTableName,
  };
  var mysqlDialectOptions = {
    connectTimeout: defaultOption.dialectConnectTimeout,
  };
  var mysqlDialect = defaultOption.dialect;
  var mysqlOptions = {
    host: defaultEnv.MYSQL_HOST,
    port: defaultEnv.MYSQL_PORT,
    dialect: mysqlDialect,
    pool: mysqlPool,
    dialectOptions: mysqlDialectOptions,
    define: mysqlDefine,
    logging: defaultEnv.MYSQL_PRODUCTION_LOGGING,
  };
  var sequelize = new Sequelize(defaultEnv.MYSQL_NAME, defaultEnv.MYSQL_USER, defaultEnv.MYSQL_PASS, mysqlOptions);
  sequelize.authenticate().then(function() {
    var mysqlModelPath = path.join(projectRoot, defaultOption.modelPath);
    if (fs.existsSync(mysqlModelPath)) {
      fs.readdir(mysqlModelPath, function (err, files) {
        if (err) return reject(err);
        var modelList = files.filter(function (model) {
          return model.match('.js');
        });
        var models = {};
        modelList.forEach(function (model) {
          var Model = require(path.join(mysqlModelPath, model))(sequelize, Sequelize);
          var modelName = model.replace('.js', '');
          models[modelName] = Model;
        });
        Object.keys(models).forEach(function (model) {
          if (models[model].associate) models[model].associate(models);
        });
        console.log('[*] MySQL connected with ' + Object.keys(models).length + ' model(s)');
        resolve({
          connection: sequelize,
          models: models,
          Sequelize: Sequelize
        });
      });
    } else {
      console.log('[*] MySQL connected');
      resolve({
        connection: sequelize,
        models: {},
        Sequelize: Sequelize
      });
    }
  }).catch(function(err) {
    reject(err);
  });
};

function logging(...msg) {
  if (!msg[0].match(/(SELECT 1\+1 AS result)/g)) {
    console.log(msg);
  } else {
    console.log();
  }
}