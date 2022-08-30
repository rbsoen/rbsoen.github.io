{
	"title": "Bagaimana situs ini dibuat",
	"date": "2022-08-30T18:34:05+07:00",
	"slug": "website-saya",
	"tags": [
		"webdev",
		"personal",
		"2022"
	],
	"draft": false
}

Sebagai postingan pertama di situs ini, mungkin saya menulis sedikit tentang situs ini sendiri. Situs ini telah melalui beberapa versi, yang akan dijelaskan di bawah ini.

### Versi 0

Tahun 2021, saya berpikiran untuk membuat sebuah situs untuk menunjukkan karyaku selama bertahun-tahun. Pertama, saya menyusun portfolio ke dalam suatu database SQlite, dan membuat halaman HTML sederhana menggunakan Python. Halaman tersebut terdiri dari *header*, dan beberapa tabel yang berisi entri-entri dalam portfolio. Namun saya menyadari bahwa cara ini sulit untuk dikelola alias *fragile*, karena saya harus menggunakan *formatted strings*, atau menghasilkannya menggunakan modul-modul XML. Dalam kata lain, kemungkinan butuh waktu yang banyak untuk mengelola *setup* seperti ini.

{{< figure width="600"
	src= "/img/blog/sqlitedb.png"
	link="/img/blog/sqlitedb.png"
	target="_blank"
	alt="Database browser memperlihatkan isi dari database SQLite, berisi tabel-tabel berikut: achievements, attending, education, jobs, listing, organizations, repos."
	caption="Struktur database portfolio saya."
>}}

Versi ini hanya merupakan ujicoba, dan tidak dipublikasikan. Saat ini tidak tersimpan di komputer saya.

### Versi 1

{{< figure width="600"
	src= "/img/blog/rbsoen-v1.png"
	link="/img/blog/rbsoen-v1.png"
	target="_blank"
	alt="Image of my first website layout, which was pretty flat-design oriented."
>}}

Saya memakai PHP untuk versi pertama yang dipublikasikan. Waktu itu, saya beralasan karena PHP merupakan sistem *templating* yang dapat saja ditambahkan ke HTML dan programnya dapat ditulis di dalam blok `<?php ?>`. Karena programnya dapat diisolasi, mengubah layout dapat dilakukan dengan lebih mudah.

Untuk menyusun halaman, hal-hal seperti riwayat dan portfolio ditulis menggunakan loop `foreach` menggunakan data yang di-*fetch* dari database menggunakan PDO, sebagaimana dilakukan dalam website dinamik klasik. Dengan demikian, ketika script PHP dieksekusi, yang di-*output* adalah halaman yang lengkap. Oleh sebab itu saya memakai sebuah Makefile untuk melakukan build dari situs.

{{< figure width="600"
	src= "/img/blog/v1-php-and-makefile.png"
	link="/img/blog/v1-php-and-makefile.png"
	target="_blank"
	caption="Kiri: Kode sumber halaman index. Kanan: Makefile (yang sangat sederhana)."
>}}

Untuk HTML-nya sendiri, saya mencoba prinsip [*progressive enhancement*](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement), memastikan situsnya bisa diakses dengan baik ketika tidak ada Javascript, atau peramban yang dipakai bukanlah peramban GUI (seperti peramban dalam *command line*, dsb.)

Di situs ini, ada *carousel* di bagian *Sample Work*. Prinsip *progressive enhancement* saya terapkan di sini dengan menampilkan setiap bagian *carousel* secara terpisah. Ketika Javascript dinyalakan, sebuah *class* CSS khusus disematkan pada *carousel* yang mengakibatkan semua bagian tampil menumpuk di posisi yang sama, setiap bagian ditampilkan bergantian menggunakan *opacity*. Pilihan gambar juga dipopulasi agar pengguna dapat mengklik dan melihat bagian-bagian dalam *carousel*. Kode ini juga saya buat untuk mengakomodasi beberapa *carousel*, namun saya tidak sempat menambahkan lagi.

{{< figure width="600"
	src= "/img/blog/v1-portfolio-nojs.png"
	link="/img/blog/v1-portfolio-nojs.png"
	target="_blank"
	caption="Javascript dimatikan"
>}}

Ada 5 halaman dalam situs ini secara keseluruhan:
* Index
* Short portfolio
* Front-end experiments
	* Activity Logger
	* XHTML in 2021

Desain situs ini saya anggap desain sementara, dan ingin mendesain ulang situsnya agar tampil lebih "bersahabat" atau mungkin lebih modern. Tak hanya itu, sebenarnya tidak praktis untuk menjalankan Makefile setiap kali saya mengubah situs, kemudian melakukan *commit* **dan file yang dihasilkannya juga** ke GitHub. Tetapi, kalau dipikir lagi, mungkin bisa mengkonfigurasi GitHub Actions untuk mengotomasi proses ini. Meskipun demikian, hal tersebut tidak saya dilakukan karena saya punya gambaran yang lebih besar untuk situs ini, yang membutuhkan *framework* yang tepat-guna.

### Versi 2

Kemudian, saya memiliki kesempatan untuk membuat ulang situs ini. Alih-alih memakai PHP, saya memilih menggunakan *static site generator*. Saya menginginkan website ini dalam bahasa yang berbeda-beda, serta mengorganisir portfolioku agar lebih mudah untuk dibaca. Yang pertama saya temukan adalah [Eleventy](https://www.11ty.dev/), berbasis node.js. Namun karena suatu sebab, saya tinggalkan. Mungkin karena sulit untuk melakukan konfigurasi multibahasa, mungkin juga karena saya tidak menemukan bantuan relevan mengenai penggunaan *template*, atau kurang suka secara keseluruhan. Jadi, saya memilih [Hugo](https://gohugo.io/), yang juga belum saya coba, namun saya mendengar ini bagus.

Yang saya suka dari Hugo adalah, di samping waktu *build* yang cepat, ia juga mendukung [berbagai macam konfigurasi](https://gohugo.io/getting-started/configuration/) serta [*frontmatter*](https://gohugo.io/content-management/front-matter/) termasuk JSON, TOML, dan YAML. Selain itu, ia mudah untuk digunakan. Akan tetapi, sistem *template*-nya kadang-kadang "menjebak". Untuk itu, mereka memberi cara untuk [melakukan *debugging*](https://gohugo.io/templates/template-debugging/) dengan mudah. Dan karena saya ingin memegang kendali atas *markup* yang dihasilkan, saya harus membuat tema Hugo sendiri, yang sedikit meningkatkan kompleksitas pembuatan. Namun pada akhirnya saya berhasil. Dukungan multibahasanya (i18n) juga bagus, sehingga kebutuhan saya dapat dipenuhi dengan baik.

Pertama saya membuat mockup desain menggunakan Figma. Mockup ini hanya untuk menggambarkan ide dasar dari situs. Konsep awalnya adalah untuk membuatnya menyerupai buku catatan yang biasa saya bawa kuliah, sehingga menu utama bisa dibuat seperti pembatas buku dan kontennya di-*scroll* secara horizontal. Namun saya tidak jadi menerapkan, karena bisa saja mengakibatkan masalah aksesibilitas dan lebih umumnya dapat menyalahi ekspektasi pengguna, mengingat saya mencoba untuk membuat situs yang tampil profesional.

{{< figure width="600"
	src= "/img/blog/rbsoen-v2-figma.png"
	link="/img/blog/rbsoen-v2-figma.png"
	target="_blank"
	caption="Mockup pasca ide *scrolling* horizontal"
>}}

Kemudian saya menulis *markup*-nya. Saya menulis konten, kemudian dihiasi dengan tag-tag dasar dari HTML. Tujuannya adalah membuatnya *semantic* dan aksesibel dalam level yang paling dasar, serta menghemat *bandwidth* (ini juga dibantu oleh tidak digunakannya *framework*). *Markup* inilah yang akan dijadikan *template* khusus situs ini.

{{< figure width="600"
	src= "/img/blog/v2-html-and-preview.png"
	link="/img/blog/v2-html-and-preview.png"
	target="_blank"
	caption="Sangat sederhana, namun seperti inilah tampilan situs dalam mode teks."
>}}

Banyak trik yang saya gunakan dalam menulis *stylesheet* CSS-nya, seperti tombol mode gelap dan untuk menyembunyikan elemen-elemen yang tidak diinginkan secara visual namun dibaca oleh pembaca layar untuk mengurangi ambiguitas. Sebagai contoh, dalam halaman utama terdapat *timeline* kepanitiaan, dimana salah satu entri-nya tampil sebagai: "2020, UI Film Festival, Divisi Desain, Anggota." Saya ingin pernyataan tersebut terbaca oleh pembaca layar sebagai: "2020: UI Film Festival, Divisi Desain sebagai Anggota."

Hal tersebut saya capai dengan membungkus beberapa bagian dari pernyataan lengkap di dalam `<span>`, dan menggunakan selektor CSS `:nth-of-type()` untuk menyebunyikan bagian-bagian tersebut. Meski menghindari duplikasi dengan tidak menggunakan atribut WAI-ARIA untuk menulis konten yang sama sebagai judul, ia terlalu *hard-coded* terhadap *markup*.

Masih berlanjut dengan menggunakan HTML yang *semantik*, saya mencoba untuk menulis struktur dokumen dengan benar. Nama situs adalah `h1`, nama halaman adalah `h2`, bagian-bagian halaman adalah `h3` termasuk di dalam tag `section` atau `article`. Hal ini karena pada saat ini, umumnya peramban [tidak mendukung](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements#multiple_h1_elements_on_one_page) `h1` lebih dari satu, jadi lebih baik membuat rata tingkatan *heading*.

{{< figure width="600"
	src= "/img/blog/v2-document-outline.png"
	link="/img/blog/v2-document-outline.png"
	target="_blank"
>}}

Portfolio saya terbagi menjadi beberapa halaman, dengan entri-entri terdaftar dalam suatu halaman khusus. Di halaman itu, setiap entri terdiri dari `h3` dan info singkat tentang entri tersebut. Di halaman entrinya sendiri terdapat atribut yaitu "tag" untuk entri yang memungkinkan pengguna untuk melihat karya-karya yang berhubungan.

{{< figure height="600"
	src= "/img/blog/v2-portfolio-nocss.png"
	link="/img/blog/v2-portfolio-nocss.png"
	target="_blank"
>}}

Kemudian ada scriptnya. Saat ini saya sedang belajar TypeScript, dan karena itu saya menulisnya dalam bahasa tersebut. Hugo punya alat bawaan bernama ESBuild, yang dapat mengkompilasi file tersebut menjadi file Javascript biasa. Saat ini hanya ada satu script: `color-scheme.ts`.

`color-scheme.ts` digunakan untuk menyetel preferensi mode gelap/terang, dan mengaplikasikannya dengan mencentang suatu *checkbox* mode gelap. *Checkbox* yang sama juga digunakan untuk menyetel preferensi tersebut. *Checkbox* ini ditulis sebelum elemen-elemen lain guna memanfaatkan selektor CSS `~`, yang berfungsi untuk menyeleksi semua elemen setelah tilde. Contohnya, `.xyz ~ *` menyeleksi semua elemen yang ditulis setelah sebuah elemen dengan *class* `xyz` dan semua elemen tersebut berada di bawah elemen induk yang sama.

Dalam hal ini, warna halaman disetel menggunakan variabel CSS, dan *checkbox* itu mengubahnya. Variabel-variabel tersebut digunakan di seluruh halaman, oleh karena itu memungkinkan mode gelap/terang.

Preferensi ini disimpan dalam localStorage pengguna (atau *cookie*, jika itu tidak didukung). Untuk kenyamanan, jika pengguna telah menyetel mode gelap dalam perambannya (atau peramban menggunakan mode gelap sistem operasi), maka script akan mendeteksi dan menyetel mode gelap secara otomatis, apabila situs dikunjungi pertama kali.

Script ini ditulis langsung setelah *checkbox* dan tidak di-*defer*, oleh karena itu bisa dikatakan *render-blocking*. Hal ini dilakukan untuk menghindari kilatan ketika halaman sedang dimuat, karena hal itu dapat terjadi jika script ini ditulis di paling akhir seperti biasanya.

Terakhir, saya menghapus database portfolio dan mengintegrasikannya langsung ke dalam situs. Mungkin memang seharusnya berupa database *key-value* yang sederhana, dan tidak memerlukan SQL.

### Selesai

Situs ini diharapkan untuk berkembang terus seiring bertambahnya pengalaman dan pengetahuan. Tapi untuk sekarang, terima kasih telah membaca!
