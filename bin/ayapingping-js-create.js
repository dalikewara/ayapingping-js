#!/usr/bin/env node

var fs = require('fs');
var path = require('path');

/**
 * Root dir
 */

var projectDir = '';
var exampleSourceDir = path.join(__dirname, '../lib/examples');

/**
 * Controllers
 */

var controllerDir = path.join(projectDir, 'controllers');
var controllerExample = path.join(controllerDir, 'exampleController.js');
var controllerExampleSource = path.join(exampleSourceDir, '__exampleController__.js');

/**
 * Middlewares
 */

var middlewareDir = path.join(projectDir, 'middlewares');
var middlewareExample = path.join(middlewareDir, 'exampleMiddleware.js');
var middlewareExampleSource = path.join(exampleSourceDir, '__exampleMiddleware__.js');

/**
 * Plugins
 */

var pluginDir = path.join(projectDir, 'plugins');
var pluginExample = path.join(pluginDir, 'examplePlugin.js');
var pluginExampleSource = path.join(exampleSourceDir, '__examplePlugin__.js');

/**
 * Public
 */

var publicDir = path.join(projectDir, 'public');
var publicIndex = path.join(publicDir, 'index.html');
var publicIndexExampleSource = path.join(exampleSourceDir, '__exampleIndex__.html');

/**
 * Models
 */

var modelDir = path.join(projectDir, 'models');
var modelMysqlDir = path.join(modelDir, 'mysql');
var modelMysqlExample = path.join(modelMysqlDir, 'example.js');
var modelMysqlExampleSource = path.join(exampleSourceDir, '__exampleMySQLModel__.js');
var modelMongoDir = path.join(modelDir, 'mongo');
var modelMongoExample = path.join(modelMongoDir, 'example.js');
var modelMongoExampleSource = path.join(exampleSourceDir, '__exampleMongoModel__.js');

/**
 * Env
 */

var envExample = path.join(projectDir, '.env');
var envExampleSource = path.join(exampleSourceDir, '__exampleEnv__.txt');

/**
 * App
 */

var appExample = path.join(projectDir, 'app.js');
var appExampleSource = path.join(exampleSourceDir, '__exampleApp__.js');

/**
 * Initializing...
 */

console.log('Initializing...');

/**
 * Creating necessary directories 
 */

if (!fs.existsSync(controllerDir)) {
  fs.mkdirSync(controllerDir);
  console.log('Create "Controller" folder (ok)');
}
if (!fs.existsSync(middlewareDir)) {
  fs.mkdirSync(middlewareDir);
  console.log('Create "Middleware" folder (ok)');
}
if (!fs.existsSync(pluginDir)) {
  fs.mkdirSync(pluginDir);
  console.log('Create "Plugin" folder (ok)');
}
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
  console.log('Create "Public" folder (ok)');
}
if (!fs.existsSync(modelDir)) {
  fs.mkdirSync(modelDir);
  console.log('Create "Model" folder (ok)');
}
if (!fs.existsSync(modelMysqlDir)) {
  fs.mkdirSync(modelMysqlDir);
  console.log('Create "MySQL Model" folder (ok)');
}
if (!fs.existsSync(modelMongoDir)) {
  fs.mkdirSync(modelMongoDir);
  console.log('Create "Mongo Model" folder (ok)');
}

/**
 * Creating necessary examples
 */

if (!fs.existsSync(controllerExample)) {
  fs.readFile(controllerExampleSource, 'utf8', function (err, data) {
    if (err) throw new Error(err);
    fs.writeFile(controllerExample, data, function (err) {
      if (err) throw new Error(err);
      console.log('Create "Controller" example (ok)');
    });
  });
}
if (!fs.existsSync(middlewareExample)) {
  fs.readFile(middlewareExampleSource, 'utf8', function (err, data) {
    if (err) throw new Error(err);
    fs.writeFile(middlewareExample, data, function (err) {
      if (err) throw new Error(err);
      console.log('Create "Middleware" example (ok)');
    });
  });
}
if (!fs.existsSync(pluginExample)) {
  fs.readFile(pluginExampleSource, 'utf8', function (err, data) {
    if (err) throw new Error(err);
    fs.writeFile(pluginExample, data, function (err) {
      if (err) throw new Error(err);
      console.log('Create "Plugin" example (ok)');
    });
  });
}
if (!fs.existsSync(publicIndex)) {
  fs.readFile(publicIndexExampleSource, 'utf8', function (err, data) {
    if (err) throw new Error(err);
    fs.writeFile(publicIndex, data, function (err) {
      if (err) throw new Error(err);
      console.log('Create "Public Index" example (ok)');
    });
  });
}
if (!fs.existsSync(modelMysqlExample)) {
  fs.readFile(modelMysqlExampleSource, 'utf8', function (err, data) {
    if (err) throw new Error(err);
    fs.writeFile(modelMysqlExample, data, function (err) {
      if (err) throw new Error(err);
      console.log('Create "MySQL Model" example (ok)');
    });
  });
}
if (!fs.existsSync(modelMongoExample)) {
  fs.readFile(modelMongoExampleSource, 'utf8', function (err, data) {
    if (err) throw new Error(err);
    fs.writeFile(modelMongoExample, data, function (err) {
      if (err) throw new Error(err);
      console.log('Create "Mongo Model" example (ok)');
    });
  });
}
if (!fs.existsSync(envExample)) {
  fs.readFile(envExampleSource, 'utf8', function (err, data) {
    if (err) throw new Error(err);
    fs.writeFile(envExample, data, function (err) {
      if (err) throw new Error(err);
      console.log('Create "Env" example (ok)');
    });
  });
}
if (!fs.existsSync(appExample)) {
  fs.readFile(appExampleSource, 'utf8', function (err, data) {
    if (err) throw new Error(err);
    fs.writeFile(appExample, data, function (err) {
      if (err) throw new Error(err);
      console.log('Create "App" example (ok)');
    });
  });
}