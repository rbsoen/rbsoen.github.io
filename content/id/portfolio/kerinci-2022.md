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

Ini merupakan submisi tim untuk lomba AI Innovation Challenge pada [Compfest](https://www.compfest.id/) tahun 2022 (diselenggarakan
oleh Fakultas Ilmu Komputer, Universitas Indonesia). Aplikasi ini (mestinya) berfungsi untuk membuat rekomendasi serta untuk
merencanakan pariwisata ke daerah Kabupaten Kerinci. Hanya mesin rekomendasi sederhana menggunakan K-means clustering sempat
diimplementasikan sebelum deadline lomba. Mesin rekomendasi tersebut beroperasi pada deskripsi tujuan wisata. Untuk
satu tempat wisata, mesin dapat menghasilkan rekomendasi tempat wisata lain diurutkan berdasarkan tingkat kemiripan deskripsi.

Bagian back end (yang memuat logika inti aplikasi) sudah tidak berjalan lagi, namun bagian front end ini masih bisa dilihat
meskipun kemampuannya sangat terbatas.

Front end menggunakan React.js dan Tailwind CSS, sementara back end dikelola menggunakan Django.
Mesin rekomendasi menggunakan scikit-learn untuk pencocokan K-means, serta Sastrawi untuk melakukan pemotongan kata (*stemming*)
dalam rangka tokenisasi.

{{< link-button url="https://front-end-kerinci.vercel.app/" text="Lihat aplikasi" >}}
{{< link-button url="https://github.com/cf14-now-you-see-me/FrontEnd" text="Kode front end" >}}
{{< link-button url="https://github.com/cf14-now-you-see-me/BackEnd" text="Kode back end" >}}

![](/img/thumbnails/kerinci22.jpg)
