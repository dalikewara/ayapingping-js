/*!
 * mysql.js
 * Copyright(c) 2018-2020 Dali Kewara
 * MIT Licensed
 */
'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');

const { Client } = require('pg');

const client = new Client({
  host: process.env.DBHOST || '127.0.0.1',
  port: process.env.DBPORT || '3306',
  database: process.env.DBNAME || 'test',
  user: process.env.DBUSER || 'root',
  password: process.env.DBPASS || ''
});


module.exports = function (app, proto, resolve, reject) {
  var projectRoot = proto.vars.__projectRoot;
  var postgreOpt = {
    host: client.host,
    port: client.port,
    dialect: process.env.DBDIALECT,
    define: {
      timestamps: false
    }
  };

  var defaultOption = {
  modelPath: process.appjsPlgOpt.modelPath || 'models/mysql',
  poolMin: process.appjsPlgOpt.poolMin || 0,
  poolMax: process.appjsPlgOpt.poolMax || 50,
  poolIdle: process.appjsPlgOpt.poolIdle || 1,
  poolAcquire: process.appjsPlgOpt.poolAcquire || 2000000000,
  poolEvict: process.appjsPlgOpt.poolEvict || 2000000000,
  dialect: process.appjsPlgOpt.dialect || 'postgre',
  dialectConnectTimeout: process.appjsPlgOpt.dialectConnectTimeout || 2000000000,
  handleDisconnects: process.appjsPlgOpt.handleDisconnects || true,
  timestamps: false,
  paranoid: process.appjsPlgOpt.paranoid || true,
  freezeTableName: process.appjsPlgOpt.freezeTableName || true
};

var sequelize = new Sequelize(client.database, client.user, client.password, postgreOpt);
  sequelize.authenticate().then(function () {

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
        console.log('[*] Postgre connected with ' + Object.keys(models).length + ' model(s)');
        resolve({
          connection: sequelize,
          models: models,
          Sequelize: Sequelize
        });
      });
    } else {
      console.log('[*] Postgre connected');
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

