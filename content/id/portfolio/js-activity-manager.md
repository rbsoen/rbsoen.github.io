{
	"year": "2022",
	"title": "\"Activity Manager\" Javascript app",
	"attributes": [
		"visibility: personal",
		"type: application",
		"type: webdev",
		"tech: javascript",
		"year: 2022"
	],
	
	"client":   "(hobby app)",
	"contrib":  "application development",
	"software": "Text editor",
	
	"thumbnail": "/img/thumbnails/js-activity-manager.jpg"
}

Ini adalah aplikasi web murni yang berjalan secara lokal (*client-side*), menggunakan [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) untuk menyimpan data aplikasi. Oleh karena itu, semua data disimpan ke dalam profile dari browser yang digunakan untuk mengakses aplikasi ini. (Data akan disimpan khusus pada browser yang bersangkutan)

Semua form ditulis di dalam HTML sendiri, kemudian ditampilkan dan disembunyikan menggunakan JavaScript biasa - sehingga tidak banyak JS yang digunakan untuk membuat form. Jumlah ukuran semua kode (termasuk pustaka external) sekitar 32 kb. Kode ini bukanlah yang paling optimal, dan beberapa kutu (*bug*) masih ada (contohnya "Submit" bisa diklik, namun Enter tidak bisa digunakan), namun bagi saya sudah cukup memadai.

{{< link-button url="/portfolio/js-activity-manager/demo" text="Lihat aplikasi" >}}
{{< link-button url="/portfolio/js-activity-manager/demo/source.zip" text="Unduh kode sumber" >}}

![](/img/thumbnails/js-activity-manager.jpg)
