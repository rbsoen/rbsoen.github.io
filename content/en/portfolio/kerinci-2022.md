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
	"contrib":  "front end, back end (recommendation engine)",
	"software": "Text editor",
	
	"thumbnail": "/img/thumbnails/kerinci22.jpg"
}

This was a team submission for the AI Innovation Challenge in the 2022 edition of [Compfest](https://www.compfest.id/) (held by
the Faculty of Computer Science, Universitas Indonesia).

This application is a recommendation and itinerary web app for touring the Kerinci Regency. It promotes the tourism potential of
the regency, which has distinctive but lesser-known destinations.
The recommendation engine uses **K-means clustering** to determine the similarity of different destinations based
on their description, with the aim of recommending similar destinations based on mood and needs.

The back end portion (which contains the recommendation engine and main app logic) is no longer online,
however this front end UI can still be viewed in limited capacity. The application may be containerized soon.

The front end is driven by React.js and makes use of Tailwind CSS, while the back end is managed in Django.
The recommendation engine uses scikit-learn for K-means fitting and Sastrawi to stem words for tokenization.

{{< link-button url="https://front-end-kerinci.vercel.app/" text="View application" >}}
{{< link-button url="https://github.com/cf14-now-you-see-me/FrontEnd" text="Front end code" >}}
{{< link-button url="https://github.com/cf14-now-you-see-me/BackEnd" text="Back end code" >}}

![](/img/thumbnails/kerinci22.jpg)
