<?php
  $dir = '/etc/airdrop/missions';

  $files = scandir($dir);
  $filecount = count($files);
  for ($i=0; $i <= $filecount ; $i++) {
   if ($files[$i] != '.' && $files[$i] != '..' && $files[$i] != '') {
     // <li class="list-group-item"> <span class="badge badge-warning">takeoff </span> requires 1 argument, makes the drone take off to given <span class="badge badge-info">height</span></li>

     echo '<li class="list-group-item">'.$files[$i].': <span class="badge badge-info">'.file_get_contents($dir.'/'.$files[$i], 'r').'</span></li>';

   }
  }


?>
