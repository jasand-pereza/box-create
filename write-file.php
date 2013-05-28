<?php
$unique_name = 'dragbox_' . uniqid() . '.php';
$file = "files/" . $unique_name; 
$file_handle = fopen($file, 'wb') or die("can't open file");
if(array_key_exists('data_html', $_POST)) $file_data = $_POST['data_html'] . $_POST['data_css'];
if(array_key_exists('data_html', $_POST)) fwrite($file_handle, $file_data);
fclose($file_handle);

echo json_encode($unique_name);