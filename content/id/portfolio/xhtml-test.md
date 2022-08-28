{
	"year": "2021",
	"title": "Modern XHTML website test",
	"attributes": [
		"visibility: personal",
		"type: webdev",
		"tech: javascript",
		"year: 2021"
	],
	
	"client":   "(hobby app)",
	"contrib":  "application development",
	"software": "Text editor",
	
	"thumbnail": "/img/thumbnails/xhtml-test.jpg"
}

Ini contoh *landing page* dengan tampilan modern, namun ditulis dalam XHTML 1.1 Strict valid &mdash; suatu versi HTML yang telah lama ditinggalkan. Meski demikian, halaman ini menggunakan fitur CSS yang modern (custom properties, `backdrop-filter`) dan beberapa fitur JS yang modern pula.

Melalui halaman ini saya belajar bagaimana browser menangani `Content-Type` (HTTP header). Karena berextensi "xhtml", maka `Content-Type` berisi `application/xhtml+xml`, sehingga dirender oleh browser menggunakan XML renderer. Renderer ini tidak menunggu loading CSS terlebih dahulu sebelum menampilkan halaman, tidak seperti `text/html`.

Menurutku, mungkin ini salah satu alasan mengapa orang-orang dahulu menggunakan `Content-Type` `text/html` (meski bukan `Content-Type` yang tepat) untuk tipe halaman ini selain [kompatibilitas](https://www.w3.org/2003/01/xhtml-mimetype/).

{{< link-button url="/portfolio/xhtml-test/demo/index.xhtml" text="Lihat aplikasi" >}}
{{< link-button url="/portfolio/xhtml-test/demo/source.zip" text="Unduh kode sumber" >}}

![](/img/thumbnails/xhtml-test.jpg)
