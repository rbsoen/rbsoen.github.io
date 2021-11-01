<?php

require_once "common.php";

?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>rbsoen's portfolio</title>
		<link rel="stylesheet" href="style.css" media="screen">
		<meta name="viewport" content="width=device-width,height=device-height,initial-scale=1">
	</head>
	<body>
		<div class="top-bar">
    		<h1>rbsoen's Portfolio</h1>
    		<nav id="main-menu">
        		<ul>
        			<li><a href="index.html">Main page</a></li>
        		</ul>
    		</nav>
		</div>
		<section class="separated">
    		<h2>What I've done so far...</h2>
    		<div class="table-container">
        		<table>
        		<thead>
        			<th>Project</th>
        			<th>Client</th>
        			<th>Year</th>
        			<th>Type</th>
        			<th>Media</th>
        			<th>Contribution</th>
        			<th>Notes</th>
        			<th>Software used</th>
        			<th>Published?</th>
        		</thead>
        		<tbody>
        		<?php
        			foreach ($CONN->query('select * from listing order by year asc') as $row) {
					if (!empty($row['online_path'])) {
        				echo "<tr>\n\t\t".'<td>';
								if (empty($row['online_path'])) {
									echo $row['project'];
								} else {
									echo '<a href="'.$row['online_path'].'">'.$row['project'].'</a>';
								}
								echo '</td>'."\n";
        				echo "\t\t\t".'<td>'.$row['client']."</td>\n";
        				echo "\t\t\t".'<td>'.$row['year']."</td>\n";
        				echo "\t\t\t".'<td>'.$row['type']."</td>\n";
        				echo "\t\t\t".'<td>'.$row['media']."</td>\n";
        				echo "\t\t\t".'<td>'.$row['contrib']."</td>\n";
        				echo "\t\t\t".'<td>'.$row['notes']."</td>\n";
        				echo "\t\t\t".'<td>'.$row['software']."</td>\n";
        				if ($row['used'] == 1){
        					echo "\t\t<td>Yes</td>\n";
        				} else {
        					echo "\t\t<td>No</td>\n";
        				}
        				echo "\t\t</tr>\n\t\t";
					}
        			}
        		?>
        		</tbody>
        		</table>
    		</div>
		</section>
	</body>
</html>
