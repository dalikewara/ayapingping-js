/*!
 * postgres.js
 * Copyright(c) 2021 @okeeman47 | https://github.com/okeeman47
 * MIT Licensed
 */

'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');

var defaultEnv = {
  POSTGRES_HOST: process.env.POSTGRES_HOST || '127.0.0.1',
  POSTGRES_PORT: process.env.POSTGRES_PORT || '5432',
  POSTGRES_NAME: process.env.POSTGRES_NAME || '',
  POSTGRES_USER: process.env.POSTGRES_USER || '',
  POSTGRES_PASS: process.env.POSTGRES_PASS || '',
  POSTGRES_PRODUCTION_LOGGING: (process.env.POSTGRES_PRODUCTION_LOGGING === 'false') ? false : logging,
};

var defaultOption = {
  modelPath: process.appjsPlgOpt.modelPath || 'models/postgres',
  poolMin: process.appjsPlgOpt.poolMin || 0,
  poolMax: process.appjsPlgOpt.poolMax || 50,
  poolIdle: process.appjsPlgOpt.poolIdle || 1,
  poolAcquire: process.appjsPlgOpt.poolAcquire || 2000000000,
  poolEvict: process.appjsPlgOpt.poolEvict || 2000000000,
  dialect: process.appjsPlgOpt.dialect || 'postgres',
  dialectConnectTimeout: process.appjsPlgOpt.dialectConnectTimeout || 2000000000,
  handleDisconnects: process.appjsPlgOpt.handleDisconnects || true,
  timestamps: process.appjsPlgOpt.timestamps || false,
  paranoid: process.appjsPlgOpt.paranoid || true,
  freezeTableName: process.appjsPlgOpt.freezeTableName || true
};

module.exports = function (app, proto, resolve, reject) {
  var projectRoot = proto.vars.__projectRoot;
  var postgresPool = {
    min: defaultOption.poolMin,
    max: defaultOption.poolMax,
    idle: defaultOption.poolIdle,
    acquire: defaultOption.poolAcquire,
    evict: defaultOption.poolEvict,
    handleDisconnects: defaultOption.handleDisconnects,
  };
  var postgresDefine = {
    timestamps: defaultOption.timestamps,
    paranoid: defaultOption.paranoid,
    freezeTableName: defaultOption.freezeTableName,
  };
  var postgresDialectOptions = {
    connectTimeout: defaultOption.dialectConnectTimeout,
  };
  var postgresDialect = defaultOption.dialect;
  var postgresOptions = {
    host: defaultEnv.POSTGRES_HOST,
    port: defaultEnv.POSTGRES_PORT,
    dialect: postgresDialect,
    pool: postgresPool,
    dialectOptions: postgresDialectOptions,
    define: postgresDefine,
    logging: defaultEnv.POSTGRES_PRODUCTION_LOGGING,
  };
  var sequelize = new Sequelize(defaultEnv.POSTGRES_NAME, defaultEnv.POSTGRES_USER, defaultEnv.POSTGRES_PASS, postgresOptions);
  sequelize.authenticate().then(function () {
    var postgresModelPath = path.join(projectRoot, defaultOption.modelPath);
    if (fs.existsSync(postgresModelPath)) {
      fs.readdir(postgresModelPath, function (err, files) {
        if (err) return reject(err);
        var modelList = files.filter(function (model) {
          return model.match('.js');
        });
        var models = {};
        modelList.forEach(function (model) {
          var Model = require(path.join(postgresModelPath, model))(sequelize, Sequelize);
          var modelName = model.replace('.js', '');
          models[modelName] = Model;
        });
        Object.keys(models).forEach(function (model) {
          if (models[model].associate) models[model].associate(models);
        });
        console.log('[*] Postgres connected with ' + Object.keys(models).length + ' model(s)');
        resolve({
          connection: sequelize,
          models: models,
          Sequelize: Sequelize
        });
      });
    } else {
      console.log('[*] Postgres connected');
      resolve({
        connection: sequelize,
        models: {},
        Sequelize: Sequelize
      });
    }
  }).catch(function (err) {
    reject(err);
  });
};

function logging(...msg) {
  if (!msg[0].match(/(SELECT 1\+1 AS result)/g)) {
    console.log(String(msg));
  } else {
    console.log();
  }
}