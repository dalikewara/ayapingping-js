'use strict';

const appjs = require('./system/system.js')(__dirname);

appjs.env();
appjs.config();

appjs.get('/example', 'exampleController');

appjs.listen();