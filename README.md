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

`appjs` berbasis ExpressJS. Bagi yang familiar dengan ExpressJS tentu akan lebih mudah. Untuk menggunakan `appjs`, silahkan *clone/download*  *repo* ini. Di *local environment* Anda, silahkan masuk ke *folder repo*  `appjs` yang telah di *clone* tadi (*root project*). Buka terminal baru dan jalankan perintah berikut ini untuk menjalankan `appjs`:

```bash
node app.js
```

Jika berhasil, maka akan muncul keterangan "Application is live!" seperti ini:

![https://lh3.googleusercontent.com/pw/ACtC-3ffSa48lu1Ae3tyAXAYgZqw2EMO7KVueikLpKUAkH3Y3fyMR89KMQfgaQ832MFtjsIPNwzFQM1oCfWjLtpA3SBHy3Tpag6XDO70BIxo4tewcIABU7q3pDVxKj4tpPqmMGQzpp0kYtEqCyQSQouqVffA=w714-h240-no](https://lh3.googleusercontent.com/pw/ACtC-3ffSa48lu1Ae3tyAXAYgZqw2EMO7KVueikLpKUAkH3Y3fyMR89KMQfgaQ832MFtjsIPNwzFQM1oCfWjLtpA3SBHy3Tpag6XDO70BIxo4tewcIABU7q3pDVxKj4tpPqmMGQzpp0kYtEqCyQSQouqVffA=w714-h240-no)

Anda kemudian dapat melakukan *request* ke `url` dan `port` tersebut&mdash;Anda juga bisa *test* dengan membuka browser -> http://localhost:3000.

## Working directory

Pada dasarnya, Anda hanya perlu bekerja di *folder-folder* dan *file-file* berikut:

-  **`.env`**
  *File* untuk konfigurasi *environment variable*.
-  **`app.js`**
  *File* utama `appjs` untuk *start/listen* aplikasi. Selain itu, `app.js` juga tempat untuk membuat *routes* aplikasi.
-  **`app.json`**
  *File* untuk konfigurasi sistem aplikasi. Disini Anda bisa mengatur aktivasi dari `sistem modul` dan `sistem router`.
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

## Environment variables