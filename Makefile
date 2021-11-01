pages := docs/index.html docs/portfolio.html

all: $(pages)

docs/%.html:	%.src.php featured_works.php portfolio.db common.php
	php $< > $@

clean:
	rm -f $(pages)
