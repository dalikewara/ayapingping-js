/*!
 * mysql.js
 * Copyright(c) 2018-2020 Dali Kewara
 * MIT Licensed
 */

'use strict';

/**
 * Load necessary packages.
 */

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');

/**
 * Default environment variables.
 */

var defaultEnv = {
  host: process.env.MYSQL_HOST || '127.0.0.1',
  port: process.env.MYSQL_PORT || '3306',
  name: process.env.MYSQL_NAME || 'test',
  user: process.env.MYSQL_USER || 'root',
  pass: process.env.MYSQL_PASS || '',
  productionLogging: (process.env.MYSQL_PRODUCTION_LOGGING === 'false') ? false : logging,
};

/**
 * Default configuration variables.
 */

var defaultConfig = {
  modelPath: 'models/mysql',
  poolMin: 0,
  poolMax: 50,
  poolIdle: 1,
  poolAcquire: 2000000000,
  poolEvict: 2000000000,
  dialect: 'mysql',
  dialectConnectTimeout: 2000000000,
  handleDisconnects: true,
  timestamps: false,
  paranoid: true,
  freezeTableName: true,
};

/**
 * Logging function.
 * 
 * @param  {...any} msg 
 * @private
 */

function logging(...msg) {
  if (!msg[0].match(/(SELECT 1\+1 AS result)/g)) {
    console.log(msg);
  } else {
    console.log();
  }
}

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

module.exports = function (proto, config, resolve, reject) {
  var projectRoot = proto.__var.__projectRoot;
  var mysqlPool = {
    min: config.poolMin || defaultConfig.poolMin,
    max: config.poolMax || defaultConfig.poolMax,
    idle: config.poolIdle || defaultConfig.poolIdle,
    acquire: config.poolAcquire || defaultConfig.poolAcquire,
    evict: config.poolEvict || defaultConfig.poolEvict,
    handleDisconnects: config.handleDisconnects || defaultConfig.handleDisconnects,
  };
  var mysqlDefine = {
    timestamps: config.timestamps || defaultConfig.timestamps,
    paranoid: config.paranoid || defaultConfig.paranoid,
    freezeTableName: config.freezeTableName || defaultConfig.freezeTableName,
  };
  var mysqlDialectOptions = {
    connectTimeout: config.dialectConnectTimeout || defaultConfig.dialectConnectTimeout,
  };
  var mysqlDialect = config.dialect || defaultConfig.dialect;
  var mysqlOptions = {
    host: defaultEnv.host,
    port: defaultEnv.port,
    dialect: mysqlDialect,
    pool: mysqlPool,
    dialectOptions: mysqlDialectOptions,
    define: mysqlDefine,
    logging: defaultEnv.productionLogging,
  };
  var sequelize = new Sequelize(defaultEnv.name, defaultEnv.user, defaultEnv.pass, mysqlOptions);
  sequelize.authenticate().then(function() {
    var mysqlModelPath = path.join(projectRoot, config.modelPath || defaultConfig.modelPath);
    if (fs.existsSync(mysqlModelPath)) {
      fs.readdir(mysqlModelPath, function (err, files) {
        if (err) return reject(err);
        var modelList = files.filter(function (model) {
          model.match('.js');
        });
        var models = {};
        modelList.forEach(function (model) {
          var Model = sequelize.import(path.join(mysqlModelPath, model));
          var modelName = model.replace('.js', '');
          models[modelName] = Model;
        });
        Object.keys(models).forEach(function (model) {
          if (models[model].associate) models[model].associate(models);
        });
        console.info('[*] MySQL connected with ' + Object.keys(models).length + ' model(s)');
        resolve({
          connection: sequelize,
          models: models,
          Sequelize: Sequelize
        });
      });
    } else {
      console.info('[*] MySQL connected with 0 model');
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
