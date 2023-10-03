{
	"year": "2021",
	"title": "\"EverydayTasks\" PHP app",
	"attributes": [
		"visibility: personal",
		"type: application",
		"type: webdev",
		"tech: javascript",
		"tech: php",
		"year: 2021"
	],
	
	"client":   "kelas Rekayasa Perangkat Lunak",
	"contrib":  "application development",
	"software": "Text editor",
	
	"thumbnail": "/img/thumbnails/everyday-tasks.jpg"
}

![](/img/thumbnails/everyday-tasks.jpg)

{{< link-button url="https://github.com/rbsoen/EverydayTasks" text="Lihat repositori" >}}
{{< link-button url="https://github.com/rbsoen/EverydayTasks-Docker" text="Lihat konfigurasi Docker Compose" >}}

Ini merupakan tugas kelompok untuk kelas Rekayasa Perangkat Lunak dalam bentuk aplikasi web yang dibuat dengan PHP dan MySQL. Fungsinya adalah pencatat aktivitas dan pencatat hal-hal yang akan dilakukan (*to-do list*). Catatan aktivitas dapat diubah dan dihapus, dan terdapat laman yang berbeda untuk melihat aktivitas hari ini dan seluruh aktivitas yang tercatat. *To-do list* di sini disebut dengan "Tasks". Tidak seperti *to-do list* biasa, sebuah Task ketika diselesaikan akan terhubung dengan satu catatan aktivitas. Saya sempat merencanakan menggabungkan Task ke dalam satuan lain yang disebut "Project".

Aplikasi ini berkembang dari script pribadi yang ditulis pada tahun 2020 saat pandemi Covid-19, kala itu saya termotivasi untuk mencatat aktivitas saya sehari-hari untuk menghindari merasa menjalani tanpa arah. Sejak itu, aplikasi kecil ini ditulis dalam beragam bentuk, termasuk sebuah versi JavaScript lokal yang dapat dilihat [di sini](../js-activity-manager).

Versi aplikasi ini terdiri dari API (dengan arsitektur menyerupai REST) dan GUI. GUI dibagi lagi menjadi komponen *client-side* (JS) dan *server-side* (PHP). Kode JS di *client-side* memanggil API, menggerakkan elemen halaman dan mengganti halaman secara dinamis.

Kelebihan dari pendekatan ini adalah menjamin situs tetap dapat diakses meski pengguna memblokir JavaScript di perambannya, sementara memberikan pengalaman UX yang mulus bagi pengguna biasa.

Karena proyek ini tidak menggunakan *front-end framework* (melainkan hanya pustaka [Bliss](https://blissfuljs.com/)) kode JS di *client-side* dan PHP di *server-side* sangat terikat. Oleh sebab itu, suatu saat saya ingin menulis kembali aplikasi ini dalam framework atau bahasa pemrograman lain.

Anda juga dapat [membaca paper untuk proyek ini](/pdf/EverydayTasksPaper.en.pdf).
