<?php
  $file_path = '/etc/airdrop/missions/'.$_GET['name'];
  $file_content = $_GET['file_content'];

  #echo($file_path.' | '.$file_content);

  if($file_path != "" && $file_content != "") {
    $handle = fopen($file_path, 'w') or die('Cannot open file:  '.$file_path); //implicitly creates file
    fwrite($handle, $file_content);
    echo('Successfully created mission');
  } else {
    echo('Missing arguments');
  }


?>
