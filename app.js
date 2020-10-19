'use strict';

const appjs = require('./index.js')(__dirname);

appjs.env();

appjs.load('example');

appjs.get('/example');

appjs.listen();