<?php 

class loader {
  public static function acquire($file=null, $args=null) {
     if($file != null) $path = parse_url($file);
     
     if(!$args) {
       parse_str($path['query'], $output_var);
       extract($output_var);
     } else {
       extract($args);
       $path['path'] = $file;
     }
     include($path['path']); 
  }
  
  public static function checkvar() {
    
  }
}