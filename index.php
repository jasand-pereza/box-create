<?php include('library/loader.php'); ?>

<!DOCTYPE html>
<html lang="en">

<head>
  <title>box-create</title>
  <meta name="viewport" content="width=device-width" />

  <link rel="stylesheet" type="text/css" href="css/reset.css">  
  <link rel="stylesheet" type="text/css" href="css/style.css">
  <link rel="stylesheet" type="text/css" href="css/jquery-ui.css">
  <link rel="stylesheet" href="foundation/stylesheets/foundation.min.css">
  <link rel="stylesheet" href="foundation/stylesheets/app.css">
  <link rel="stylesheet" href="js/farbtastic/farbtastic.css">
  <link rel="stylesheet" href="css/presentation.css">
  
  <script type="text/javascript" src="js/jquery.min.js"></script>
  <script type="text/javascript" src="js/jquery-ui.min.js"></script>
  <script type="text/javascript" src="js/farbtastic/farbtastic.js"></script>
  <script type="text/javascript" src="js/box-create.js"></script>
</head>

<body>
  <div id="menu">
    
    <!--REG ELEMENTS -->
    <div class="divbox menu-item"><strong class="hide mi-div">div</strong></div>
    <div class="imgbox menu-item"><strong class="hide mi-img">&lt;img</strong><?php loader::acquire('templates.php?part=image'); ?></div>
    <div class="btnbox menu-item"><strong class="hide mi-btn">(btn)</strong><?php loader::acquire('templates.php?part=button&value=submit'); ?></div>
    <div class="inputbox menu-item"><strong class="hide mi-in">[in]</strong><?php loader::acquire('templates.php?part=input'); ?></div>
    <div class="clearbox menu-item"><strong class="hide mi-cl">cl</strong></div>
    <div class="textbox menu-item"><strong class="hide mi-t">T</strong><?php loader::acquire('templates.php?part=text_area'); ?></div>
    <div class="lorembox menu-item"><strong class="hide mi-lorem">lorem</strong><?php loader::acquire('templates.php?part=lorem&num=2&styles[color]=black'); ?></div>
    
    <!-- FOUNDATION -->
    <div class="rowbox menu-item rw"><strong class="hide mi-div-row">row</strong></div>
    <div class="eightbox menu-item eight-c found"><strong class="hide mi-div-span-eight">sp8</strong></div>
    <div class="buttonbox menu-item f-btn"><strong class="hide mi-div-btn">btn</strong></div>
    <div class="hpbox menu-item f-h5-p"><strong class="hide mi-h5-p">fh5p</strong><?php loader::acquire('templates.php?part=f-h5-and-p'); ?></div>
    <div class="ftopbarbox menu-item f-topbar"><strong class="hide mi-f-topbar">topbar</strong><?php loader::acquire('templates.php?part=f-topbar'); ?></div>
    <div class="fnavbarbox menu-item f-navbar"><strong class="hide mi-f-navbar">navbar</strong><?php loader::acquire('templates.php?part=f-navbar'); ?></div>
    <div class="fpaginationbox menu-item f-pagi"><strong class="hide mi-f-pagi">pagi</strong><?php loader::acquire('templates.php?part=fpagination'); ?></div>
    <div class="fsidenavbox menu-item f-sidenav"><strong class="hide mi-f-sidenav">sidenav</strong><?php loader::acquire('templates.php?part=sidenav'); ?></div>
    <div class="fsubnavbox menu-item f-subnavbox"><strong class="hide mi-f-subnav">subnav</strong><?php loader::acquire('templates.php?part=subnav'); ?></div>
    <div class="fbreadcrumbsbox menu-item f-breadcrumbs"><strong class="hide mi-f-breadcrumb">bread</strong><?php loader::acquire('templates.php?part=breadcrumbs'); ?></div>
    <div class="fpanelbox menu-item f-panel six-c"><strong class="hide mi-f-panel">panel</strong><?php loader::acquire('templates.php?part=panel'); ?></div>
    <div class="fpanelcalloutbox menu-item f-panel six-c"><strong class="hide mi-f-panelcallout">panelcall</strong><?php loader::acquire('templates.php?part=panel&class=callout%20radius'); ?></div>
    
    <!-- ADD SNIPPET -->
    <div class="addbox menu-item" id="snip-add"><strong class="hide mi-plus">+</strong></div>
  </div>

  <!-- main grid -->
  <div id="el_id_0" data-exclude-box="" class="main grid-element"></div>

  <div id="the_grid" class="row">
    <div class="one column"></div>
    <div class="one column"></div>    
    <div class="one column"></div>
    <div class="one column"></div>
    <div class="one column"></div>      
    <div class="one column"></div>
    <div class="one column"></div>
    <div class="one column"></div>
    <div class="one column"></div>
    <div class="one column"></div>
    <div class="one column"></div>  
    <div class="one column"></div>        
  </div>
  
  <div id ="colorwheel">
    <div id="colorpicker"></div>
  </div>
  
  <?php $file_contents = file_get_contents('templates.json'); 
    $templates_list = json_decode($file_contents);
    echo 'templates_list';
    $output = '<select>';
    foreach($templates_list->templates as $tl) {
      $output.= '<option value="' . $tl->name . '">' . $tl->name .'</option>';
    }
    $output.='</select>';
    echo '<div id="tlist" style="display: none;">' . $output . '</div>';
   ?>
</body>
</html>