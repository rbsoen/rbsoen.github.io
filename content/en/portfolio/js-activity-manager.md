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
	
	"client":   "Hobby app",
	"contrib":  "application development",
	"software": "Text editor",
	
	"thumbnail": "/img/thumbnails/js-activity-manager.jpg"
}

This is a pure web application that runs completely client-side using [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) to store information. Because it uses IndexedDB, all data is stored inside the specific profile of the specific browser that it is accessed in.

All forms are pre-rendered in the HTML, and then shown, hidden, and manipulated using vanilla JavaScript - of which a relatively minimal amount is used. The total amount of code in its source form (including external libraries) is about 32 kb. The code is not the most optimal, and there are a few bugs (such as submit actions working, but not when pressing "Enter"), however I believe it serves my personal needs well for now.

{{< link-button url="./demo" text="View application" >}}
{{< link-button url="./demo/source.zip" text="Download source code" >}}

![](/img/thumbnails/js-activity-manager.jpg)
