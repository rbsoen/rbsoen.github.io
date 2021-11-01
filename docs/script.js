// override all
	(function(){
		// aktivasi semua slideshow
		let
			slideshows = document.querySelectorAll('.slideshow'),
			slideshowControls = document.querySelectorAll('.slideshow-controls')
		;

		// menampilkan gambar dari suatu slide
		function displayImage(slideId, imageId){
			// TODO: ganti slideId menjadi data dari "data-slideshow-id"
			let slideShow = slideshows[slideId];
			let slideshowControl = slideshowControls[slideId];
			// nonaktifkan dulu semua gambar
			for (i = 0; i < slideShow.children.length; i++){
				var imageTarget = slideShow.children[i];
				var controlTarget = slideshowControl.children[i];
				imageTarget.classList = "entry";
				controlTarget.classList = "";

				// baru aktifkan target
				if (imageId == i){
					imageTarget.classList += " current";
					controlTarget.classList = "current";
				}
			}
		}

		// nyalakan semua slideshow
		for (i=0; i < slideshows.length; i++){
			var singleSlideshow = slideshows[i];
			var slideshowEntryCount = singleSlideshow.childElementCount;
			var slideshowId = singleSlideshow.getAttribute("data-slideshow-id")
			
			singleSlideshow.classList += " activated";

			// buat controlnya
			for (j = 0; j < slideshowControls.length; j++){
				if (slideshowControls[j].getAttribute("data-slideshow-id") == slideshowId){
					var slideshowControl = slideshowControls[j];

					for (k = 0; k < slideshowEntryCount; k++){
						// buat imagenya
						var image = singleSlideshow.children[k];
						image.addEventListener('click', function(e){
							window.open(
								(this.getElementsByTagName("img")[0].getAttribute("src")),
								"_blank"
							);
						});
						// buat controlnya
						var button_contain = document.createElement("li");
						var button = document.createElement("a");
						button.innerText = "view image "+k;
						button.setAttribute('data-to-image', k);
						button.setAttribute('href', '#');
						button.addEventListener('click', function(e){
							e.preventDefault();
							displayImage(slideshowId, this.getAttribute('data-to-image'));
						});
						button_contain.appendChild(button);
						slideshowControl.appendChild(button_contain);
					}
				}
			}
		}

		// gambar pertama
		displayImage(0, 0);
		
		// modifikasi scroll
		let links = document.querySelectorAll('a[href^="#s-"]');
		for (i=0; i < links.length; i++){
			links[i].addEventListener('click', function(e){
				e.preventDefault();

				history.pushState(
					{},
					'',
					e.currentTarget.href
				);
				document.getElementById(
					this.getAttribute('href').substr(1)
				).scrollIntoView({
					behavior: 'smooth'
				});
			});
		}
	})();