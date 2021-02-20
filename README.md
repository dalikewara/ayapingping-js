# AyaPingPing JS

A starter pack framework in NodeJS for building REST API applications.

[![npm package](https://nodei.co/npm/ayapingping-js.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/ayapingping-js/)

[![version](https://img.shields.io/npm/v/ayapingping-js.svg?style=flat)](https://img.shields.io/npm/v/ayapingping-js.svg?style=flat)
[![build](https://img.shields.io/circleci/project/github/dalikewara/ayapingping-js.svg?style=flat)](https://img.shields.io/circleci/project/github/dalikewara/ayapingping-js.svg?style=flat)
[![language](https://img.shields.io/github/languages/top/dalikewara/ayapingping-js.svg?style=flat)](https://img.shields.io/github/languages/top/dalikewara/ayapingping-js.svg?style=flat)
[![download](https://img.shields.io/npm/dt/ayapingping-js.svg?style=flat)](https://img.shields.io/npm/dt/ayapingping-js.svg?style=flat)
[![dependents](https://img.shields.io/librariesio/dependents/npm/ayapingping-js.svg?style=flat)](https://img.shields.io/librariesio/dependents/npm/ayapingping-js.svg?style=flat)
[![issue](https://img.shields.io/github/issues/dalikewara/ayapingping-js.svg?style=flat)](https://img.shields.io/github/issues/dalikewara/ayapingping-js.svg?style=flat)
[![last_commit](https://img.shields.io/github/last-commit/dalikewara/ayapingping-js.svg?style=flat)](https://img.shields.io/github/last-commit/dalikewara/ayapingping-js.svg?style=flat)
[![license](https://img.shields.io/npm/l/ayapingping-js.svg?style=flat)](https://img.shields.io/npm/l/ayapingping-js.svg?style=flat)

```javascript
const appjs = require('ayapingping-js')(__dirname);

appjs.get('/my-route', 'myController');

appjs.listen();
```

# Features

 - Using the power of [ExpressJS](https://github.com/expressjs/express)
 - Allows you to use most of ExpressJS operations (using `express` function)
 - Easy implementation
 - Controller-based routing
 - Focus on simplicity & performance
 - Plugin mechanism (custom plugin & built in plugin)
 - Executable for generating applications project structure quickly (`./node_modules/.bin/ayapingping-js-create`)

# Docs

 - For full documentation, visit the [Wiki](https://github.com/dalikewara/ayapingping-js/wiki)

# Getting started

### Installation

`ayapingping-js` tersedia di *NPM package manager*. Untuk meng*install*, pertama buat dulu *folder project* Anda dan masuk kedalam *folder* tersebut:

```bash
mkdir my-project
cd my-project
```

Kemudian, install `ayapingping-js` dengan perintah berikut:

```bash
npm install ayapingping-js
```

Setelah proses *install* berhasil, eksekusi perintah berikut untuk membuat *working directory* dari `ayapingping-js`:

```bash
./node_modules/.bin/ayapingping-js-create
```

Perintah diatas akan membuat *folders* dan *files* baru seperti: `app.js`, `.env`, `controllers`, dll yang dibutuhkan untuk memulai menggunakan `ayapingping-js`.

### Getting the latest version

Gunakan perintah berikut untuk melakukan *update* `ayapingping-js` ke versi yang terbaru:

```bash
npm update ayapingping-js
```

# Basic usage

`ayapingping-js` berbasis `ExpressJS`. Bagi yang familiar dengan `ExpressJS` tentu akan lebih mudah. Untuk menggunakan `ayapingping-js`, silahkan *install* terlebih dahulu sesuai dengan petunjuk installasi diatas. Masuk ke *folder project* Anda, kemudian buka terminal baru dan eksekusi file `app.js` menggunakan perintah berikut ini untuk menjalankan aplikasi:

```bash
node app.js
```

Anda juga bisa menggunakan `pm2` untuk menjalankan `ayapingping-js`. Contoh:

```bash
pm2 start app.js
```

Jika berhasil, maka akan muncul keterangan "Application is live!" seperti ini:

![https://lh3.googleusercontent.com/pw/ACtC-3fXyv2-V38wmHj798L2v3rf_d_wel3p2qIlZY5QiuW5ugQT_Lt_DM9OitVxRIOR6wwDStl0bmdnyFPu4jmsqBvWRUo2W9rUdPMt_JuoGsQUi4DUp6VRjienxLK3ysuXfv9svqeXNtReyVF7hXYPChR7=w714-h214-no](https://lh3.googleusercontent.com/pw/ACtC-3fXyv2-V38wmHj798L2v3rf_d_wel3p2qIlZY5QiuW5ugQT_Lt_DM9OitVxRIOR6wwDStl0bmdnyFPu4jmsqBvWRUo2W9rUdPMt_JuoGsQUi4DUp6VRjienxLK3ysuXfv9svqeXNtReyVF7hXYPChR7=w714-h214-no)

Anda kemudian dapat melakukan *request* ke `url` dan `port` tersebut&mdash;Anda juga bisa *test* dengan membuka browser ke -> http://localhost:3000.

### Simple routing (`ayapingping-js` style)

Anda bisa membuat *route* sederhana di `app.js` dengan format seperti berikut:

```javascript
appjs.get('/my-route', 'myRouteController');
```

Kemudian, di *folder* `controller` buat *file* bernama `myRouteController.js` dan isikan:

```javascript
'use strict';

module.exports = function(proto, req, res, next) {
  res.send('Hello world!');
};
```

*Route* baru berhasil dibuat. Jika Anda mengakses *route* `GET '/my-route'`, maka Anda akan mendapatkan *response* "Hello world!".

> `ayapingping-js` adalah *controller-based*. Jadi setiap *route* harus memiliki *controller* untuk meng*handle* *logic* utamanya.

### Simple routing (`ExpressJS` style)

Anda juga bisa membuat *route* di `app.js` dengan gaya `ExpressJS` seperti berikut ini:

```javascript
appjs.express((proto, app) => {
  // ExpressJS style
  app.get('/my-route', (req, res, next) => {
    res.send('Hello world!');
  });
  app.get('/my-route-2', (req, res, next) => {
    res.send('Hello world! Again!');
  });
});
```

# Contributing

Follow the Contributing Guide (updated soon).

### People

Thanks to all people who took their time to contribute to this project.

[List of all contributors](https://github.com/dalikewara/ayapingping-js/graphs/contributors)

# Release

### Changelog

Read at [CHANGELOG.md](https://github.com/dalikewara/ayapingping-js/blob/master/CHANGELOG.md)

### Credits

Copyright &copy; 2020 - 2021 [Dali Kewara](https://www.dalikewara.com)

### License

[MIT License](https://github.com/dalikewara/ayapingping-js/blob/master/LICENSE)