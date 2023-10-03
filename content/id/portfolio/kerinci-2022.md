{
	"year": "2022",
	"title": "\"Kerinci 2022\" tourism web app",
	"attributes": [
		"visibility: contest entry",
		"type: application",
		"type: webdev",
		"tech: javascript",
		"year: 2022"
	],
	
	"client":   "Compfest 14 entry",
	"contrib":  "front end, back end (mesin rekomendasi)",
	"software": "Text editor",
	
	"thumbnail": "/img/thumbnails/kerinci22.jpg"
}

![](/img/thumbnails/kerinci22.jpg)

{{< link-button url="https://front-end-kerinci.vercel.app/" text="Lihat aplikasi" >}}
{{< link-button url="https://github.com/cf14-now-you-see-me/FrontEnd" text="Kode front end" >}}
{{< link-button url="https://github.com/cf14-now-you-see-me/BackEnd" text="Kode back end" >}}

Ini merupakan submisi tim untuk lomba AI Innovation Challenge pada [Compfest](https://www.compfest.id/) tahun 2022 (diselenggarakan
oleh Fakultas Ilmu Komputer, Universitas Indonesia).

Aplikasi ini berfungsi untuk membuat rekomendasi serta untuk merencanakan pariwisata ke daerah Kabupaten Kerinci. Aplikasi ini
mempromosikan potensial pariwisata daerah ini, yang memiliki destinasi yang unik namun kurang dikenal.
Mesin rekomendasi aplikasi menggunakan teknik **K-means clustering** yang menghasilkan rekomendasi berdasarkan deskripsi
dari tempat wisata, bertujuan untuk menyesuaikan tempat wisata berdasarkan keinginan pengguna.

Bagian back end (yang memuat logika inti aplikasi) sudah tidak berjalan lagi, namun bagian front end ini masih bisa dilihat
meskipun kemampuannya sangat terbatas. Aplikasi ini mungkin akan dibuat kontainernya.

Front end menggunakan React.js dan Tailwind CSS, sementara back end dikelola menggunakan Django.
Mesin rekomendasi menggunakan scikit-learn untuk pencocokan K-means, serta Sastrawi untuk melakukan pemotongan kata (*stemming*)
dalam rangka tokenisasi.
