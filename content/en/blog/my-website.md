{
	"title": "How I made this website",
	"date": "2022-08-30T18:34:05+07:00",
	"slug": "my-website",
	"tags": [
		"webdev",
		"personal",
		"2022"
	],
	"draft": false
}

As the first post in my site, I'd thought I'd write a bit about the website itself. It has gone through several iterations, which I will shortly describe.

### Iteration 0

In 2021, I had the idea to make a website to showcase my work. But first, I compiled my portfolio onto a single SQLite database, and then compiled them into a single page using Python. That page consists of a header, and some tables detailing the contents of my portfolio. However, it quickly occurred to me that this way of generating my website is fragile, since I either have to use what is essentially formatted strings, or generate it through the use of XML modules. In other words, it would take a lot of work to maintain such a setup.

{{< figure width="600"
	src= "/img/blog/sqlitedb.png"
	link="/img/blog/sqlitedb.png"
	target="_blank"
	alt="Database browser viewing the contents of a SQLite database, containing the following tables: achievements, attending, education, jobs, listing, organizations, repos."
	caption="My portfolio database structure."
>}}

This iteration was only a test run, and is not published. I currently don't have this one saved on my computer.

### Iteration 1

{{< figure width="600"
	src= "/img/blog/rbsoen-v1.png"
	link="/img/blog/rbsoen-v1.png"
	target="_blank"
	alt="Image of my first website layout, which was pretty flat-design oriented."
>}}

Then, for my first iteration of my website, I decided to use PHP. The reasoning is that PHP is a templating system - it extends HTML with a bit of logic, just prefixed with `<?php ?>`. Since the application logic can be isolated away in PHP code blocks, making changes to layout is deemed easier.

Generating the page, specifically, things like my short history and portfolio were done using `foreach` loops on the data fetched from the database using PDO, just like one would on a (classical) dynamic website, and were echoed out, so that when the PHP script is executed, it would output the fully formed page. As such, I used a Makefile to generate the page.

{{< figure width="600"
	src= "/img/blog/v1-php-and-makefile.png"
	link="/img/blog/v1-php-and-makefile.png"
	target="_blank"
	caption="Left: source for my index page. Right: the (very simple) Makefile."
>}}

As to how the HTML was written, I tried to use [progressive enhancement](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement) principles, making sure the website was fully viewable (and somewhat accessible) when no scripting or when no visual browser is used (such as a command line browser, etc.).

Now, there is a carousel in the "Sample Work" section of my former iteration. Keeping that in mind, I rendered each element of the carousel separately. When JavaScript is enabled, a special class is activated that overlays every carousel element in the same position, each entry switched to by way of opacity. The carousel selection is also populated so that the user can click through and view other entries. The code is also written to support multiple slideshows, although there has never been any more carousels coded into the page.

{{< figure width="600"
	src= "/img/blog/v1-portfolio-nojs.png"
	link="/img/blog/v1-portfolio-nojs.png"
	target="_blank"
	alt="Multiple samples of work being shown on the page with its own title and description."
	caption="Javascript disabled"
>}}

In total, there were 5 pages on the website:
* Index
* Short portfolio
* Front-end experiments
	* Activity Logger
	* XHTML in 2021

My website's design at this point was deemed temporary, and I've been wanting to redesign it to make it look more "friendly". Not to mention, it was quite cumbersome to have to re-run the Makefile everytime I make changes, and then commit it *and the generated files* to GitHub. Though, in hindsight, I could have figured out how to use a GitHub action to automate this. But I've actually got bigger plans for it, which necessitates a switch to a more robust framework.

### Iteration 2

And then I finally had more time to refresh my website. Instead of using PHP, I decided to use a static site generator. I wanted to make my website in multiple languages, and I wanted to organize my portfolio so that it's more easier to read. My first pick was [Eleventy](https://www.11ty.dev/), which is node.js-based. But for some reason, I left it. I either found it difficult to set up multi-language support, not found what I wanted regarding template support, or just didn't like it all that much. So, I moved to [Hugo](https://gohugo.io/), which I didn't try either, but have heard good things about.

What I like about it is aside from its fast build times, it also supports a diverse range of [configuration](https://gohugo.io/getting-started/configuration/) and [frontmatter](https://gohugo.io/content-management/front-matter/), including JSON, TOML, YAML. It's also relatively easy to pick up. That being said, its templating system can be quite tricky at times. But, they offer you a way to [debug its output](https://gohugo.io/templates/template-debugging/) easily. And since I wanted to be in control of the markup, it also necessitated writing a new Hugo theme, which slightly increases the complexity. But, I managed to figure it out. Its support for internationalization (i18n) is also quite good, so it fits my goals like a glove.

I first mocked up the design in Figma. The mockup was only to draw up a basic idea of what the website might look like. My original concept was to make my website look like the notebook that I would carry around to college, and so the main navigation might look like bookmarks, and the main content would be scrolled horizontally. But I ditched the horizontal scrolling idea, as it might cause accessibility problems and generally throw off a user's expectations, being what is meant to be a professional website.

{{< figure width="600"
	src= "/img/blog/rbsoen-v2-figma.png"
	link="/img/blog/rbsoen-v2-figma.png"
	target="_blank"
	alt="Draft layout for the 2nd iteration of my website."
	caption="Mockup, after the horizontal scrolling idea was dropped"
>}}

I then wrote up an idea of what the markup will be, writing up the content and then decorate it using basic HTML tags. The goal of this is to ensure that I can make it semantic (and accessible) on a basic level, and to save bandwidth (which is helped by the fact that I do not use any front-end frameworks here). It was this markup that will soon be the bespoke template for this site.

{{< figure width="600"
	src= "/img/blog/v2-html-and-preview.png"
	link="/img/blog/v2-html-and-preview.png"
	target="_blank"
	alt="HTML mockup code of my website, as well as its preview."
	caption="Extremely basic, and what my website would likely appear on text-only modes."
>}}

There are a lot of tricks used in the CSS, such as the dark mode toggle, and to hide visually undesired elements that would be spoken out by screen readers to reduce ambiguity. For example, entries under the "Organizations" timeline on the main page are formatted like so: "2020, UI Film Festival, Design Division, staff". I aim to make it read as so: "2020: UI Film Festival, Design Division as Staff."

The trick used here is to wrap parts of the statement in `<span>`, and use the `:nth-of-type()` CSS selector to hide them. Although it avoids duplication by not using WAI-ARIA attributes to write the same content as a title, it is also very much "hard-coded" to the markup.

Keeping with the theme of semantic HTML, I tried to make the document structure properly-formatted. The website header is an `h1`, its page header an `h2`, and its subsections `h3`, even inside `section` or `article` tags. This is because browsers at this time generally [do not support](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements#multiple_h1_elements_on_one_page) multiple `h1`, so it is better to treat heading levels as flat for the time being.

{{< figure width="600"
	src= "/img/blog/v2-document-outline.png"
	link="/img/blog/v2-document-outline.png"
	target="_blank"
	alt="Document outline showing the website name in h1, page title in h2 and everything else in h3."
>}}

My portfolio is split up into individual pages, with entries on a listing page. The listing is an `h3`, a short summary of the entry. The page itself lists attributes, which are the "tags" for the portfolio entry intended to allow the the viewer to browse related work.

{{< figure height="600"
	src= "/img/blog/v2-portfolio-nocss.png"
	link="/img/blog/v2-portfolio-nocss.png"
	target="_blank"
	alt="The portfolio in plain-text HTML, showing the site title, the menu, and several entries with its own headings, year and client info, and a View link."
>}}

And then, there's the scripting. Since at this moment I am currently studying TypeScript, I decided to use it. Hugo comes with ESBuild, which allows me to compile them into standard Javascript files. At the moment, there's one script being used: `color-scheme.ts`.

`color-scheme.ts` sets the user's dark/light mode preference, and applies it by checking the single "dark mode" checkbox. The same checkbox is used to set the settings as well. This checkbox is placed before other elements on the page to make use of the `~` CSS selector, which selects every other element to the right of the tilde. For example, `.xyz ~ *` selects every element that follows any element with an `xyz` class that shares a parent element.

In this case, the colors are set using CSS variables, and the checkbox changes it. These variables are used throughout the whole page, so it is able to set a dark/light mode on the page.

The preference is then stored on the user's localStorage (or cookies, if that isn't supported). As a convenience, if the user has dark mode set on their browser (or the browser respects the operating system dark mode settings), then the script will detect that and set the dark mode setting automatically if the user visits the site for the first time.

The script is placed directly after the checkbox and it is not deferred, therefore it can be considered render-blocking. This is done to avoid color flashes when loading the page, as that would happen if the script is placed at the end of the page as is conventionally done.

Finally, I got rid of the portfolio database and just integrated it inside the website itself. It might as well be a simple key-value database anyway, and you don't need SQL for that.

### Fin

It's to be expected that my website will grow in complexity as I attain more experience and know a bunch more. But for now, thanks for reading!
