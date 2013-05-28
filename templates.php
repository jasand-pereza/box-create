
<?php if(!isset($part)) return false; ?>


<?php if($part == 'div'): ?>
<!-- DIV -->  
<div id="" class="hidden_element" style="background-color: <?php echo $styles['background-color']; ?>"></div>
<?php return; endif; ?>


<?php if($part == 'text_area'): ?>
<!-- TEXTAREA -->
<textarea id="" class="hidden_element"></textarea>
<?php return; endif; ?>


<?php if($part == 'input'): ?>
<!-- INPUT -->  
<input id="" class="hidden_element">
<?php return; endif; ?>


<?php if($part == 'button'): ?>
<!-- BUTTON -->  
<button id="" class="hidden_element" value="<?php echo $value; ?>"><?php echo $value; ?></button>
<?php return; endif; ?>


<?php if($part == 'image'): ?>
<!-- IMG -->  
<img id="" class="hidden_element" src="images/fpo-image.jpg" width="100%" height="100%">
<?php return; endif; ?>


<?php if($part == 'lorem'): ?>
<!-- LOREM IPSUM -->
<p class="hidden_element" style="<?php echo 'color:' . $styles['color']; ?>">
<?php echo str_repeat('Lorem ipsum dolor sit amet, consectetur vel consequat a, placerat vel eros.', $num); 
?></p>
<?php return; endif; ?>


<?php if($part == 'f-h5-and-p'): ?>
<!-- Foundation h5 -->
<h5 class="hidden_element">h5 title element</h5>
<p class="hidden_element" style="<?php echo 'color:' . $styles['color']; ?>">
Lorem ipsum dolor sit amet, consectetur vel consequat a, placerat vel eros.
</p>
<?php return; endif; ?>


<?php if($part == 'f-topbar'): ?>
    <div class="twelve columns hidden_element">
      <nav class="top-bar">
        <ul>
          <!-- Title Area -->
          <li class="name">
            <h1>
              <a href="#">
                Top Bar Title
              </a>
            </h1>
          </li>
          <li class="toggle-topbar"><a href="#"></a></li>
        </ul>

        <section>
          <!-- Left Nav Section -->
          <ul class="left">
            <li class="divider"></li>
            <li class="has-dropdown">
              <a class="active" href="#">Item 1</a>
              <ul class="dropdown">
                <li><label>Section Name</label></li>
                <li class="has-dropdown">
                  <a href="#" class="">Level 1, Has Dropdown</a>
                  <ul class="dropdown">
                    <li><a href="#">Level 2</a></li>
                    <li><a href="#">Level 2</a></li>
                    <li class="has-dropdown"><a href="#">Level 2, Has Dropdown</a>
                      <ul class="dropdown">
                        <li><label>Section</label></li>
                        <li><a href="#">Level 3</a></li>
                        <li><a href="#">Level 3</a></li>
                        <li class="divider"></li>
                        <li><a href="#">Level 3</a></li>
                      </ul>
                    </li>
                    <li><a href="#">Level 2</a></li>
                    <li><a href="#">Level 2</a></li>
                  </ul>
                </li>
                <li><a href="#">Level 1</a></li>
                <li><a href="#">Level 1</a></li>
                <li class="divider"></li>
                <li><label>Section Name</label></li>
                <li><a href="#">Level 1</a></li>
                <li><a href="#">Level 1</a></li>
                <li><a href="#">Level 1</a></li>
                <li class="divider"></li>
                <li><a href="#">See all &rarr;</a></li>
              </ul>
            </li>
            <li class="divider hide-for-small"></li>
          </ul>

          <!-- Right Nav Section -->
          <ul class="right">
            <li class="divider show-for-medium-and-up"></li>
            <li class="has-dropdown">
              <a href="#">Item 2</a>
              <ul class="dropdown">
                <li><label>Section Name</label></li>
                <li><a href="#" class="">Level 1</a></li>
                <li><a href="#">Dropdown Option</a></li>
                <li><a href="#">Dropdown Option</a></li>
                <li class="divider"></li>
                <li><label>Section Name</label></li>
                <li><a href="#">Dropdown Option</a></li>
                <li><a href="#">Dropdown Option</a></li>
                <li><a href="#">Dropdown Option</a></li>
                <li class="divider"></li>
                <li><a href="#">See all &rarr;</a></li>
              </ul>
            </li>
          </ul>
        </section>
      </nav>
    </div>
<?php endif; ?>


<?php if($part == 'f-navbar'): ?>
  <ul class="nav-bar hidden_element">
                  <li class="active"><a href="#">Nav Item 1</a></li>
      <li class="has-flyout is-touch">
        <a href="#">Nav Item 2</a>
        <a href="#" class="flyout-toggle"><span> </span></a>
        <ul class="flyout" style="">
          <li><a href="#">Sub Nav Item 1</a></li>
          <li><a href="#">Sub Nav Item 2</a></li>
          <li><a href="#">Sub Nav 3</a></li>
          <li><a href="#">Sub Nav 4</a></li>
          <li><a href="#">Sub Nav Item 5</a></li>
        </ul>
      </li>
      <li class="has-flyout is-touch">
        <a href="#">Nav Item 3</a>
        <a href="#" class="flyout-toggle"><span> </span></a>
        <div class="flyout" style="">
          <h5>Regular Dropdown</h5>
          <div class="row">
            <div class="six columns">
              <p>This is example text. This is example text. This is example text. This is example text. This is example text. This is example text. This is example text. This is example text.</p>
            </div>
            <div class="six columns">
              <p>This is example text. This is example text. This is example text. This is example text. This is example text. This is example text. This is example text. This is example text.</p>
            </div>
          </div>
        </div>
      </li>
      <li class="has-flyout is-touch">
        <a href="#">Nav Item 4</a>
        <a href="#" class="flyout-toggle"><span> </span></a>
        <div class="flyout large right" style="display: none;">
          <h5>Large Dropdown</h5>
          <div class="row">
            <div class="four columns">
              <p>This is example text. This is example text. This is example text. This is example text. This is example text. This is example text. This is example text. This is example text.</p>
              <p>This is example text. This is example text. This is example text. This is example text. This is example text. This is example text. This is example text. This is example text.</p>
            </div>
            <div class="four columns">
              <p>This is example text. This is example text. This is example text. This is example text. This is example text. This is example text. This is example text. This is example text.</p>
              <p>This is example text. This is example text. This is example text. This is example text. This is example text. This is example text. This is example text. This is example text.</p>
            </div>
            <div class="four columns">
              <img src="http://placehold.it/200x250">
            </div>
          </div>
        </div>
      </li>
    </ul>
<?php endif; ?>

<?php if($part =='fpagination'): ?>
<div class="hidden_element">
  <ul class="tabs-content">
    <li class="active" id="pagExTab">
    <ul class="pagination">
    <li class="arrow unavailable"><a href="">&laquo;</a></li>
    <li class="current"><a href="">1</a></li>
    <li><a href="">2</a></li>
    <li><a href="">3</a></li>
    <li><a href="">4</a></li>
    <li class="unavailable"><a href="">&hellip;</a></li>
    <li><a href="">12</a></li>
    <li><a href="">13</a></li>
    <li class="arrow"><a href="">&raquo;</a></li>
  </ul>
</div>
<?php endif; ?>

<?php if($part == 'sidenav'): ?>
<div class="hidden_element">
  <ul class="four side-nav">
    <li class="active"><a href="#">Link 1</a></li>
    <li><a href="#">Link 2</a></li>
    <li class="divider"></li>
    <li><a href="#">Link 3</a></li>
    <li><a href="#">Link 4</a></li>
  </ul>
</div>
<?php endif; ?>


<?php if($part == 'subnav'): ?>
<div class="hidden_element">
  <dl class="sub-nav">
    <dt>Filter:</dt>
    <dd class="active"><a href="#">All</a></dd>
    <dd><a href="#">Active</a></dd>
    <dd><a href="#">Pending</a></dd>
    <dd><a href="#">Suspended</a></dd>
  </dl>
</div>
<?php endif; ?>


<?php if($part == 'breadcrumbs'): ?>
<div class="hidden_element">
  <ul class="breadcrumbs">
    <li><a href="#">Home</a></li>
    <li><a href="#">Features</a></li>
    <li class="unavailable"><a href="#">Gene Splicing</a></li>
    <li class="current"><a href="#">Home</a></li>
  </ul>
</div>
<?php endif; ?>


<?php if($part == 'panel'): ?>
<div class="panel <?php if($class) echo $class; ?> hidden_element">
  <h5>This is a regular panel.</h5>
  <p>It has an easy to override visual style, and is appropriately subdued.</p>
</div>
<?php endif; ?>
