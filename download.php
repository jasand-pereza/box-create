<?php 

$file_name = (array_key_exists('file_name', $_GET)) ? $_GET['file_name'] : 'rename-file.php';
$file_name = preg_replace('/\"/', '', $file_name);
echo shell_exec("tidy -m -config config.txt files/$file_name");
header("Content-Type: application/force-download");
header("Content-Disposition: attachment; filename=" . $file_name);
header("Content-Transfer-Encoding: binary");
readfile("files/$file_name");