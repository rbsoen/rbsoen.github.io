<?php

require_once "common.php";

// daftar karya yang akan ditampilkan
require_once "featured_works.php"
?>
<!DOCTYPE html>
<html lang="en-US">
	<head>
		<meta charset="utf-8">
		<title>rbsoen</title>
		<link rel="stylesheet" href="style.css" media="screen">
		<meta name="viewport" content="width=device-width,height=device-height,initial-scale=1">
	</head>
	<body>
		<div class="top-bar">
    		<h1>rbsoen</h1>
    		<nav id="main-menu">
        		<ul>
        			<li><a href="#s-home">Home</a></li>
        			<li><a href="#s-about">About</a></li>
        			<li><a href="#s-skills">Skills</a></li>
        			<li><a href="#s-work">Samples</a></li>
        			<li><a href="#s-contact">Contact</a></li>
        		</ul>
    		</nav>
		</div>
		<header id="s-home" class="intro-header">
    		<p> <!-- leading paragraph -->
    			<span class="lead-text">
    				Hi, I am
    			</span>
    			<b class="name">
    				Rodriguez
					</b>
    			<b class="name">
    				Breil
					</b>
					<b class="name">
						Soenoto.
    			</b>
    			<span class="lead-text">
    				I am a
    			</span>
    			<b class="subtitle">
    				multimedia designer and aspiring
    				software creator.
    			</b>
					<span class="header-actions">
						<a href="#s-work" class="fake-button">See my work here.</a>
						<a href="experiments/" class="fake-button">See my front-end experiments.</a>
					</span>
    		</p>
		</header>
		<section id="s-about" class="separated" style="background: var(--about-bg);">
    		<h2>About me</h2>

    		<p>
    			I've been interested in computers and technology in general
    			ever since I was a child,
    			having started coding at age 12.

    			I have also been interested in graphic design beginning around
    			the same time, and as a result, I have a keen eye for art.

    			As a self-learner, I strive to be very good in the things
    			that I am interested in.
    		</p>
    		<p>
    			As time goes on, I expanded to other fields like video editing,
    			aiming to prove that I can do it all &mdash; at high quality &mdash; using
    			any tool available to me.

    			For five years now, Linux distributions have been my preferred
    			daily driver. This decision catalyzes me to learn programming
    			to automate my tasks further, and it increases my appreciation
    			and respect of technology in general.
    		</p>
    		<p>
    			Today, at 21, I have accumulated quite a lot of work that
    			I consider satisfactory, and I often use code to increase
    			efficiency and speed.
    		</p>
    		<p>
    			See also my <a href="cv/CV English.pdf">CV</a>.
    		</p>
    	</section>

		<section class="has-grid separated" style="background: var(--experience-bg);">
			<div class="grid-block">
    		<h3 style="--icon-image: var(--education-icon);">Education</h3>
    		<ul class="is-timeline">
    			<?php

    				foreach ($CONN->query('select * from education order by since') as $row) {
    					echo "<li>";
    					echo $row['since'].'-'.$row['until'];
    					echo "<br>";
    					echo '<b class="institution">';
    					echo $row['institution'];
    					echo '</b>';
						if (!empty($row['major'])) {
							echo "<br>";
	    					echo '<span class="occupation">';
	    					echo $row['major'];
	    					echo '</span>';
						}
    					echo "</li>\n\t\t\t";
    				}

    			?>
    		</ul>
    		</div>

			<div class="grid-block">
    		<h3 style="--icon-image: var(--organization-icon);">Organizations</h3>
    		<ul class="is-timeline">
    			<?php

    				foreach ($CONN->query('select * from organizations order by since') as $row) {
    					echo "<li>";
    					echo $row['since'].'-'.$row['until'];
    					echo "<br>";
    					echo '<b class="organization">';
    					echo $row['organization'];
    					echo '</b>';
    					echo "<br>";
    					echo '<span class="occupation">';
    					echo $row['as'];
    					echo '</span>';
    					echo "</li>\n\t\t\t";
    				}

    			?>
    		</ul>
    		</div>

			<div class="grid-block">
    		<h3 style="--icon-image: var(--staffwork-icon);">Staffwork</h3>
    		<ul class="is-timeline">
    			<?php

    				foreach ($CONN->query('select * from jobs order by since') as $row) {
    					echo "<li>";
    					echo $row['since'];
    					if (!($row['since'] == $row['until'])){
    						echo '-'.$row['until'];
    					}
    					echo "<br>";
    					echo '<b class="organization">';
    					echo $row['where'];
    					echo '</b>';
    					if (!empty($row['division'])){
    						echo "<br>";
    						echo '<i class="division">';
    						echo $row['division'];
    						echo '</i>';
    					}
    					echo "<br>";
    					echo '<span class="occupation">';
    					echo $row['occupation'];
    					echo '</span>';
    					echo "</li>\n\t\t\t";
    				}

    			?>
    		</ul>
    		</div>

			<div class="grid-block">
    		<h3 style="--icon-image: var(--achievements-icon);">Achievements</h3>
    		<ul class="is-timeline">
    			<?php

    				foreach ($CONN->query('select * from achievements order by year') as $row) {
    					echo "<li>";
    					echo $row['year'];
    					echo "<br>";
    					echo '<b class="competition">';
    					echo $row['competition'];
    					echo "</b>";
    					echo "<br>";
    					echo '<span class="placement">';
    					echo $row['as'];
    					echo '</span>';
    					echo "</li>\n\t\t\t";
    				}

    			?>
    		</ul>
    		</div>
		</section>

		<section id="s-skills" class="separated" style="background: var(--skills-bg);">
    		<h2>Skills</h2>
    		<div class="has-grid">
        		<div class="grid-block">
            		<h3 style="--icon-image: var(--graphics-icon);">Graphic Design</h3>
            		<p>
            			Over the years, I have worked on design-related projects for
            			various events and organizations.
            		</p>
            	</div>
        		<div class="grid-block">
            		<h3 style="--icon-image: var(--videoedit-icon);">Video Editing</h3>
            		<p>
									I have also worked on numerous video projects.
									These range from animation to editing montages.
            		</p>
        		</div>
        		<div class="grid-block">
            		<h3 style="--icon-image: var(--web-icon);">Web Development</h3>
            		<p>
            			My design work can extend to the web as well, creating
            			modern and easy-to-access web applications and sites.
									Aside from HTML and CSS, I am currently programming in
									<strong>PHP</strong>, and slowly improving my Javascript.
            		</p>
        		</div>
        		<div class="grid-block">
            		<h3 style="--icon-image: var(--programming-icon);">Application Development</h3>
            		<p>
            			I frequently use Python to assist me in doing my work.
									As a result, I am somewhat proficient in using it to do
									my tasks.
            		</p>
        		</div>
        	</div>
		</section>

		<section id="s-work" class="separated" style="background: var(--portfolio-bg);">
    		<h2>Sample Work</h2>

    		<div class="slideshow" data-slideshow-id="0">
        		<?php

        			foreach ($WORKS as $entry){
        				echo '<div class="entry">';
        				echo '<img width="400" src="'.$entry['file'].'" alt="'.$entry['alt'].'"/>';
        				echo "<div>";
        				echo "<b>".$entry['client']."</b><br>";
        				echo "<span>".$entry['name']."</span>";
        				echo '</div>';
        				echo '</div>';
        			}

        		?>
    		</div>
    		<aside class="instapaper_ignore">
    		<ul class="slideshow-controls" data-slideshow-id="0">
    		</ul>
    		</aside>
    		<p>
    		To see the pictures in full, simply click on it.
    		For a complete list, see my <a href="portfolio.html">portfolio page</a>.</p>
    		</section>

		<section id="s-contact" class="separated" style="background: var(--contact-bg);">
    		<h2>Contact me</h2>
    		<p>Interested in what I do? Contact me at:</p>
    		<address class="email">
    			rbsoenoto [at] gmail [dot] com
    		</address>
    		<address class="email">
    			rodriguez.breil [at] ui [dot] ac [dot] id
    		</address>
    		<address class="github">
    			<a href="https://github.com/rbsoen">rbsoen</a>
    		</address>
		</section>

		<footer>
			&copy; 2021 rbsoen
			<br>
			Icons from Font Awesome, licensed under <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>.
			No modifications were made other than
			changing the icon color.
		</footer>

		<script src="script.js"></script>
	</body>
</html>
