<?php 

/* function & args */
if(array_key_exists('post_class', $_POST)) $post_class = $_POST['post_class'];
if(array_key_exists('post_method', $_POST)) $post_method = $_POST['post_method'];
if(array_key_exists('post_method_args', $_POST)) $post_method_args = $_POST['post_method_args'];

$post_class = 'loader';
$post_method = 'acquire';

$post_method_args = (array) json_decode($post_method_args);

if($post_class && $post_method && $post_method_args) {
  require $post_class . '.php';
  $post_class::$post_method(null, $post_method_args);
}
