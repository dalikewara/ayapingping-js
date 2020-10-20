'use strict';

const appjs = require('./index.js')(__dirname);

appjs.env();

appjs.load('examplePlugin');

appjs.get('/example');

appjs.listen();