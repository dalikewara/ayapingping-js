# What is AyaPingPing?

AyaPingPing is the `basename` of my starter pack framework for building REST API applications. The goal is to create a simple, clean, and maintainable application environment that also has advantages in performance and security. The first AyaPingPing was made only for building REST API in NodeJS. It was around 2018/2019, when NodeJS became the only one programming language I worked with. But now, I learn and work with some new programming languages. So, I implement AyaPingPing in other programming languages.

# AyaPingPing JS (appjs)

And this is the implementation of AyaPingPing in NodeJS. The name become AyaPingPing JS, or called `appjs`.

> English documentation would be available soon.

# `appjs v3`

Kenapa versi 3?

`appjs v3` adalah versi pertama yang saya rilis untuk umum. AyaPingPing pada awalnya saya buat untuk memenuhi kebutuhan *development* di tempat kerja. Mulai dari `v0.1` hingga terakhir `v2.1` dengan serangkaian optimasi yang terus dilakukan untuk menangani kelemahan-kelematan pada versi sebelumnya. Hingga `v2.1`, AyaPingPing masih bersifat *private*.

AyaPingPing bisa terus berkembang adalah karena kontribusi dari rekan-rekan *developer* di kantor. Mereka mendukung saya, memberikan kritik dan masukan, serta melaporkan *issue*, bahkan rela mengembangkan sistem baru di dalam AyaPingPing&mdash;yang semuanya itu bertujuan membantu agar *framework* ini menjadi lebih baik.

Kontribusi *developer* lain sangatlah penting. Oleh karena itu, saya akhirnya memutuskan merilis AyaPingPing untuk umum. Dengan harapan, AyaPingPing dapat digunakan untuk membantu pekerjaan rekan-rekan *developer* lain di luar sana. Saya juga berharap mendapatkan *feedback*, sehingga kita bisa berkontribusi bersama untuk membuat *framework* ini menjadi lebih baik lagi kedepannya.

# Welcome to `v3`

`appjs v3` merupakan pengembangan dari `v2.1`. Meskipun sebagian besar fungsinya masih mirip dengan `v2.1`, namun *problem* & kelemahan yang muncul di `v2.1` telah diperbaiki di `v3`. Selain itu, `v3` menggunakan konsep & mekanisme yang benar-benar baru&mdash;tidak seperti `v0.1` - `v2.1`.

Pada `v3`, AyaPingPing menawarkan mekanisme *Internal System Management*. *Internal system* disini adalah *custom process* berupa *module/router* yang akan dieksekusi pada saat aplikasi pertama di *start*. Kita bisa menambahkan fungsi-fungsi *internal* sesuai kebutuhan kita, kemudian mengaktifkan atau menonaktifkannya, sehingga memudahkan kita mengontrol jalannya aplikasi.

# Basic usage

`appjs` berbasis `ExpressJS`. Bagi yang familiar dengan `ExpressJS` tentu akan lebih mudah. Untuk menggunakan `appjs`, silahkan *clone/download*  *repo* ini. Di *local environment* Anda, silahkan masuk ke *folder repo*  `appjs` yang telah di *clone* tadi (*root project*). 

Ubah nama file `.env.example` menjadi `.env`, kemudian buka terminal baru dan jalankan perintah berikut ini untuk menjalankan `appjs`:

```bash
node app.js
```

Jika berhasil, maka akan muncul keterangan "Application is live!" seperti ini:

![https://lh3.googleusercontent.com/pw/ACtC-3ffSa48lu1Ae3tyAXAYgZqw2EMO7KVueikLpKUAkH3Y3fyMR89KMQfgaQ832MFtjsIPNwzFQM1oCfWjLtpA3SBHy3Tpag6XDO70BIxo4tewcIABU7q3pDVxKj4tpPqmMGQzpp0kYtEqCyQSQouqVffA=w714-h240-no](https://lh3.googleusercontent.com/pw/ACtC-3ffSa48lu1Ae3tyAXAYgZqw2EMO7KVueikLpKUAkH3Y3fyMR89KMQfgaQ832MFtjsIPNwzFQM1oCfWjLtpA3SBHy3Tpag6XDO70BIxo4tewcIABU7q3pDVxKj4tpPqmMGQzpp0kYtEqCyQSQouqVffA=w714-h240-no)

Anda kemudian dapat melakukan *request* ke `url` dan `port` tersebut&mdash;Anda juga bisa *test* dengan membuka browser -> http://localhost:3000.

### Simple routing (`appjs` style)

Anda bisa membuat *route* baru di `app.js` seperti ini:

```javascript
appjs.get('/my-route', 'myRouteController');
```

Kemudian di *folder* `controller` buat *file* bernama `myRouteController.js` dan isikan:

```javascript
'use strict';

module.exports = function(mod, req, res, next) {
  res.send('Hello world!');
};
```

Jika Anda mengakses *route* `GET '/my-route'`, maka Anda akan mendapatkan *respon* "Hello world!".

### Simple routing (`ExpressJS` style)

Anda juga bisa membuat *route* baru di `app.js` dengan gaya `ExpressJS` seperti berikut ini:

```javascript
appjs.express((mod, app) => {

  // ExpressJS style
  app.get('/my-route', (req, res, next) => {
    res.send('Hello world!');
  });

});
```

# Working directory

Pada dasarnya, Anda hanya perlu bekerja di *folder-folder* dan *file-file* berikut:

-  **`.env`**
  *File* untuk konfigurasi *environment variables*.
-  **`app.json`**
  *File* untuk konfigurasi sistem aplikasi. Disini Anda bisa mengatur aktivasi *plugin* dari `system modules` dan `system routers`.
-  **`app.js`**
  *File* utama `appjs` untuk *start/listen* aplikasi. Selain itu, `app.js` juga tempat untuk membuat *routes* aplikasi.
-  **`controllers`**
  *Folder* untuk menaruh *file-file*  `controller` dari *route* yang Anda buat.
-  **`middlewares`**
  *Folder* untuk menaruh *file-file*  `middleware` dari *route* yang Anda buat. `middleware` disini bersifat *OPTIONAL*, karena Anda boleh membuat *route* tanpa `middleware`.
-  **`models`**
  *Folder* untuk menaruh *file-file*  `model`  *database*, misalnya: *Sequelize model* untuk MySQL atau *Mongoose model* untuk Mongo. `model` disini bersifat *OPTIONAL*, karena Anda mungkin menggunakan mekanisme *raw* daripada model *database*.
-  **`helpers`**
  *Folder* untuk menaruh *file-file*  `helper`. `helper` disini adalah *custom function* (*OPTIONAL*) yang Anda buat sendiri untuk membantu pengerjaan aplikasi Anda, misalnya: Anda bisa membuat *file*  `mail.js` (fungsi untuk mengirim email) di dalam *folder*  `helpers`.
-  **`settings`**
  *Folder* untuk menaruh *file-file*  `setting`. `setting` disini adalah *custom setting* (*OPTIONAL*) yang Anda buat sendiri untuk membantu pengerjaan aplikasi Anda, misalnya: Anda bisa membuat *file*  `email_templates.json` (*setting template* untuk email) di dalam *folder*  `settings`.

# Environment variables

*Environment variables* menentukan bagaimana sistem aplikasi berjalan tergantung pada jenis *environment server* atau komputer yang dipakai. `appjs` memiliki 3 *environment variables* utama berikut ini yang digunakan ketika aplikasi di *start*:

```
NODE_ENV=development
SERVICE_NAME=AyaPingPing JS
PORT=3000
```

*Environment variables* di `appjs` disimpan didalam file `.env`. Anda harus me *load file* `.env` pada saat aplikasi di *start* agar sistem bisa menggunakan *variable-variable*nya. Ada banyak cara, tapi Anda bisa melakukan hal ini dengan memanggil fungsi *environment variables* setelah inisialisasi `appjs system`: (lihat contohnya di `app.js`)

```javascript
appjs.env();
```

### Application environment

`NODE_ENV` mengatur mode *environment* aplikasi yang sedang berjalan, *default*: "development". Untuk merubah *environment* aplikasi ke mode `production`, ubah nilai `NODE_ENV` menjadi "production":

```
NODE_ENV=production
```

> `NODE_ENV` dipakai oleh ExpressJS untuk menentukan *environment* aplikasi.
> 
> Selalu gunakan mode `production` apabila Anda ingin melakukan *deployment* ke arsitektur atau *environment production*.

### Service name

`SERVICE_NAME` adalah nama dari aplikasi `appjs`, *default*: "AyaPingPing JS". Anda bisa merubahnya sesuai dengan nama aplikasi yang sedang Anda buat, misalnya:

```
SERVICE_NAME=My Application
```

> `SERVICE_NAME` dipakai untuk beberapa hal di dalam sistem aplikasi, misalnya: nama aplikasi yang ditampilkan di `console`.

### Port

`PORT` menentukan *port* yang akan di listen pada saat aplikasi dijalankan, default: "3000". Anda bisa merubah pengaturan *port*nya sesuai dengan kebutuhan, misalnya:

```
PORT=8000
```

> `PORT` diperlukan oleh sistem aplikasi agar bisa berjalan. Jika `port` tidak di *set*, maka akan di *set default* menjadi "3000".

# System & Configurations

### System

Sistem utama `appjs` berada pada *file* `system.js` yang ada di dalam *folder* `system`. Untuk dapat menjalankan `appjs`,  Anda harus memanggil `system.js` dan menginisialisasi objeknya. Anda dapat melakukannya dengan menggunakan *script* berikut: (lihat contohnya di `app.js`)

```javascript
const appjs = require('./system/system.js')(__dirname);
```

*Script* diatas akan menginisialisasi semua objek dan fungsionalitas sistem yang dibutuhkan untuk menjalankan `appjs`. Diantara fungsionalitas tersebut ialah fungsi untuk membuat *routing*, fungsi untuk konfigurasi, fungsi untuk *environment variables*, hingga fungsi untuk *listen* aplikasi.

> Anda sebaiknya tidak merubah apapun yang ada pada *file* `system.js`.

### Configuration

Sebelum Anda dapat menggunakan *file* konfigurasi, Anda terlebih dahulu harus memanggil fungsi konfigurasi setelah inisialisasi `appjs system`: (lihat contohnya di `app.js`)

```javascript
appjs.config();
```

Konfigurasi sistem `appjs` ada pada *file* `app.json`.  Anda bisa mengatur aktivasi *plugin* `system modules` dan `system routers`. Berikut adalah struktur dan pengaturan awal dari *file* `app.json`:

```json
{
  "system_modules": {
    "path": "system/modules",
    "use": [],
    "config": {}
  },
  "system_routers": {
    "path": "system/routers",
    "use_before_app": [],
    "use_after_app": [],
    "config": {}
  }
}
```

> Secara *default*, `appjs` menyediakan beberapa *plugins* yang bisa digunakan.

- **System modules**
	- **path**
	- **use**
	- **config**

- **System routers**
	- **path**
	- **use_before_app**
	- **use_after_app**
	- **config**