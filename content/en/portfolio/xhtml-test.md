{
	"year": "2021",
	"title": "Modern XHTML website test",
	"attributes": [
		"visibility: personal",
		"type: webdev",
		"tech: javascript",
		"year: 2021"
	],
	
	"client":   "Hobby app",
	"contrib":  "application development",
	"software": "Text editor",
	
	"thumbnail": "/img/thumbnails/xhtml-test.jpg"
}

This is a modern landing page, but it's written using valid XHTML 1.1 Strict &mdash; a form of HTML most people have left behind. Even so, this makes use of relatively modern CSS features (custom properties, chrome's `backdrop-filter`) as well as some of the more recent JS features.

Through this page I discovered the difference in how the browser handles `Content-Type`. Using `application/xhtml+xml`, with an "xhtml" extension, the page is rendered using the XML renderer. The CSS *does not* block
renders here. The usual `text/html` on the other hand, will block rendering until the CSS is fully loaded. In my opinion, that might be another reason why people apply the content type of `text/html` even if technically it's only possible [for compatibility](https://www.w3.org/2003/01/xhtml-mimetype/).

{{< link-button url="./demo/index.xhtml" text="View application" >}}
{{< link-button url="./demo/source.zip" text="Download source code" >}}

![](/img/thumbnails/xhtml-test.jpg)
