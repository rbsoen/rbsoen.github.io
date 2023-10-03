{
	"title": "Membuat grid Instagram dengan header and footer di Linux",
	"date": "2023-10-03T16:12:32+07:00",
	"slug": "instagram-grids",
	"tags": [
		"graphic design",
		"personal",
		"2023",
		"scripting"
	],
	"draft": false
}

Dalam beberapa kesempatan saya ditugaskan untuk membuat poster atau banner untuk media sosial, khususnya Instagram. Nah, dibandingkan media sosial lain, Instagram memiliki gaya postingan yang cukup unik: Postingan kebanyakan berbentuk persegi&mdash;dengan demikian&mdash;tampilan feed dioptimalkan untuk bentuk persegi. Sebuah hal yang umum adalah membuat "grid poster", yaitu membuat postingan sedemikian rupa sehingga ketika profilnya dilihat, akan tampak gambar yang lebih besar dan bersatu, alih-alih gambar-gambar yang jelas terpisah.

{{< figure width="600"
	src= "/img/blog/uiff21-feed.png"
	link="/img/blog/uiff21-feed.png"
	target="_blank"
	caption="Courtesy @uifilmfestival"
>}}

Cara yang sederhana untuk membuat postingan seperti itu adalah hanya dengan membuat desain yang besar dan memisahkan ke dalam kotak-kotak. Tidak apa apa&mdash;namun banyak profil (khususnya untuk organisasi dan acara), hal yang menarik terjadi ketika suatu kotak dibuka.


{{< figure width="300"
	src= "/img/blog/uiff21-feed-2.png"
	link="/img/blog/uiff21-feed-2.png"
	target="_blank"
	caption="Courtesy @uifilmfestival"
>}}

Anda akan melihat postingan-postingan tersebut bukan hanya persegi biasa, melainkan persegi panjang dengan header dan footer. Meski dengan tinggi extra, Instagram tetap meng-crop gambar sehingga muat dalam grid. Jika mendesain langsung pada kanvas untuk satu postingan tentunya desain seperti ini dapat dengan mudah dibuat. Namun jika berhubungan dengan gambar yang besar yang terdiri dari gambar-gambar yang kecil, mungkin agak dibuat sulit. Saya pribadi menganggap cara ini tetap bagus untuk dilakukan karena akan membuat postingan tampil lebih profesional.

Mungkin bisa digunakan artboard di program seperti Photoshop dan Illustrator untuk membuat postingan-postingan seperti itu, tetapi dari sumber-sumber yang saya cari, header dan footer mungkin harus tetap di-*copas* untuk setiap kotak.

Untuk pekerjaan desain saya menggunakan Inkscape, meskipun tidak ada fitur *bawaan* yang saya ketahui untuk dapat mengekspor grid saat ini, saya dapat gunakan tools lain seperti ImageMagick untuk melakukannya dengan bantuan Bash scripting. Membuat script untuk pekerjaan-pekerjaan kecil merupakan salah satu alasan kenapa saya menyukai Linux&mdash;yang saya gunakan sebagai OS utama setidaknya sejak 2015&mdash;dalam hal ini memungkinkan saya untuk mengiterasi desain dengan cepat, dan melakukan ekspor siap-unggah ketika desain telah selesai.

Sederhananya saya meng-crop gambar yang besar menjadi kotak-kotak kecil, dan menempelkan kotak-kotak kecil tersebut di atas template. Kekurangan dari cara ini adalah saya membutuhkan template postingan beraspek 4:5 yang sama untuk setiap kotak, sehingga mengurangi kemungkinan header/footer dapat diselaraskan dengan isi postingan. Tentunya eksperimentasi lebih lanjut dapat membantu, namun dalam postingan ini saya hanya akan menjelaskan sebagaimana yang telah saya lakukan.

### Skenario

- Akun sosmed tujuan desain memiliki aspek rasio standar postingan 4:5.
- Area kotak 1:1 direservasikan di tengah-tengah untuk konten utama, sebab Instagram akan meng-crop postingan sesuai dengan batas ini.
- Setiap postingan harus memiliki header (untuk logo) dan footer (untuk informasi kontak dll.), hal-hal tesebut sudah disediakan.
- Saya harus mendesain banner untuk grid dengan memperhatikan yang di atas.

Saat mengirim ke tim Public Relations, saya harus mengirim gambar-gambar terpisah yang siap untuk dipost.

Apa yang saya lakukan?

### Aspek desain

Pertama-tama saya langsung mendesain satu poster besar, dimana panjang dan lebar kanvas masing-masing adalah kelipatan 1000. Angka 1000 ini saya pilih untuk memudahkan penghitungan. Karena Instagram akan menampilkan 3 postingan tiap baris dalam suatu profil, otomatis lebarnya menjadi 3000.

Artinya, untuk template 4:5, tingginya (5 / 4) &times; 1000 = 1250 px.

Untuk membantu memvisualisasikan batas-batas postingan, saya menyetel grid 1000&times;1000. Ini memungkinkan saya untuk mengatur desain sehingga elemen-elemen dapat dengan rapi difokuskan di setiap kotak. Contoh, jika terdapat teks (seperti tanggal), saya mungkin tak mau teks tersebut melintas kotak.

{{< figure width="800"
	src= "/img/blog/inkscape-grids.png"
	link="/img/blog/inkscape-grids.png"
	target="_blank"
>}}

Selain itu, mungkin tak banyak hal khusus yang dilakukan di sini. Jika sudah selesai, saya ekspor kanvas penuh.

### Memotong gambar kecil-kecil

{{< figure width="500"
	src= "/img/blog/convert-images-root-folder.png"
	link="/img/blog/convert-images-root-folder.png"
	target="_blank"
>}}

Nah di sini saya ubah desain menjadi format yang diharapkan melalui proses dua langkah, dan untuk setiap langkah saya membuat folder khusus. Saya menamai folder tersebut `crop` dan `publish`.

Saya pisahkan gambar ke gambar lebih kecil masing-masing berukuran 1000&times;1000 menggunakan ImageMagick:
```sh
magick design.png -crop 1000x1000 -reverse crop/design.png
```

Dengan asumsi saya punya gambar 3000&times;1000, ini akan menghasilkan 3 file dalam `crop`: `design-0.png`, `design-1.png`, `design-2.png`, dengan urutan sesuai urutan pengunggahan. Biasanya crop terjadi dari kiri ke kanan dan atas ke bawah, namun dengan menulis `-reverse` akan membuatnya terbalik, dari kanan ke kiri dan bawah ke atas.

{{< figure width="400"
	src= "/img/blog/convert-split-images.png"
	link="/img/blog/convert-split-images.png"
	target="_blank"
>}}

### Menempelkan di atas template

Saya punya `template.png` dimana setiap gambar kecil akan ditempelkan tepat di tengah-tengah. Misalkan salah satu gambar dari langkah sebelumnya:
```sh
magick composite -gravity center crop/design-0.png template.png publish/design-0.png
```

Jika saya ingin menerapkannya ke semua gambar, saya menggunakan for-loop melalui semua gambar, lalu mengganti nama folder dengan *string substitution*:
```sh
for i in crop/design-*.png; do magick composite -gravity center $i template.png ${i/crop\//publish\/}; done
```

`${i/crop\//publish\/}` artinya: Ambil variabel `i`, cari yang bernama `crop/` dalam `i` (`/` harus diubah ke `\/`), kemudian ganti dengan `publish/`.

Ini akan memberikan gambar-gambar yang sama namun ditempelkan pada `template.png` di folder `publish`, dan inilah yang akan dikirim ke tim PR.

{{< figure width="400"
	src= "/img/blog/convert-final-images.png"
	link="/img/blog/convert-final-images.png"
	target="_blank"
>}}

### Script

Seluruh proses ini dapat diotomasikan dalam satu script, yang disebut `splitdesign.sh`:
```sh
#!/bin/bash

if [ $# -lt 3 ]; then
    echo "Penggunaan: $0 desain [template] [ukuran persegi]"
    echo
    echo "Memisahkan desain besar menjadi ukuran postingan Instagram dan tempelkan"
    echo "di atas template. Hasil akan berada di folder bernama \"publish\"."
    echo
    echo "Template harus memiliki panjang sama dengan [ukuran persegi]"
    echo "Panjang dan lebar desain harus merupakan kelipatan dari [ukuran persegi]"
    exit 0
fi

mkdir -p crop
mkdir -p publish

# Crop desain menjadi gambar2 berukuran 1000x1000
magick $1 -crop $3\x$3 -reverse crop/$1

# Tempelkan gambar2 di atas template
for i in crop/*.png; do
    magick composite -gravity center $i $2 ${i/crop\//publish\/}
done

# Hapus folder crop
rm -r crop
```

(Script juga tersedia [di sini](https://gist.github.com/rbsoen/e6a488daacd47cff8023181db594a197).)

Ini script yang memiliki 3 parameter:
1. File desain
2. File template
3. Ukuran persegi dalam pixel

Contohnya, untuk postingan dengan panjang kotak 1000px: `./splitdesign.sh design.png template.png 1000`. Hasilnya akan berada di `publish`.

Semoga membantu!
