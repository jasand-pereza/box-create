var css_scafold = null;

$(function(j) {

  var grid_map = new Array();
  var last_item_selected;
  var last_parent;
  var next_highest_depth = 3;
  var ele_inc = 0;
  var $main = $('#el_id_0');
  var $the_grid = $('#the_grid');
  var is_resizing = false;
  var is_dragging = false;
  var is_mouse_moving = false;

  // match the grid up with the content area
  $main.css({
    'left': $the_grid.offset().left,
    'top': $the_grid.offset().top
  });

  $(window).resize(function() {
    $main.css({
      'left': $the_grid.offset().left,
      'top': $the_grid.offset().top,
      'width': $the_grid.width()
    });
  })

  // set scaffold menu items positions 
  $('.menu-item').each(function() {
    var scaff_name = $(this).attr('class').match(/(\w*)box/);
    scaff_name = 'scaff-' + scaff_name[0];
    $('#menu').append('<div class="' + scaff_name + ' scaff-menu-item"></div>');
    var $scaff_obj = $('.' + scaff_name);
    $(this).data('excludeBox', '').css({
      'top': $scaff_obj.position().top,
      'left': $scaff_obj.position().left
    });
  });


  function set_grid() {
    $('.grid-element').each(function(i) {
      grid_map[i] = $(this).attr('id');
    });
  }


  $.fn.set_insertion_defaults = function() {
    $this = $(this);
    if (!$this.hasClass('f-btn')) {
      if (!$this.hasClass('found')) $this.resizable({
        handles: 'n, e, s, w, nw, ne, se, sw'
      });
      if ($this.hasClass('found')) $this.resizable({
        handles: 'n, s'
      });

      $this.resizable({
        start: function(event, ui) {
          is_resizing = true;
          $(this).css('box-shadow', '0px 0px 21px 1px #000');
          //$(this).get_box_controls('hide');
        },
        stop: function(event, ui) {
          is_resizing = false;
          if ($(this).parent().attr('id') != 'el_id_0') {
            $(this).css({
              'left': 0,
              'top': 0,
              'position': 'relative',
              //'box-shadow'   : 'none'
            });
          }
        }
      });
    }

    $this.draggable({
      start: function(event, ui) {
        is_dragging = true;
      },
      stop: function(event, ui) {
        is_dragging = false;
      }
    });

    $this.attr('id', 'ele_id_' + ele_inc);
    $this.addClass('grid-element');
    $this.css({
      'margin': 0
    });
    release_item($this);

    $this.on('mouseout', function(e) {
      $(this).css({
        'box-shadow': 'none'
      });
    })

    $this.on('mouseleave', function(e) {
      //$(this).get_box_controls('hide');
      $(this).css('border', 'initial');
    })

    $this.on('click', function(e) {
      if (e.altKey) {
        if ($(this).attr('id') == $this.attr('id')) {
          $(this).clone_box();
          return;
        }
      }
    });


    $this.on('dblclick', function(e) {
      var $this = $(this);
      if ($(document).find('#temp_edit_box').length > 0) return;

      if (e.shiftKey == true) {
        $('body').prepend('<input type="text" id="temp_edit_box" name="temp" class="temp" style="width: ' + ($this.width() + 20) + 'px;" value ="' + $(this).text() + '"/>');
        $('#temp_edit_box').css({
          'position': 'absolute',
          'z-index': 5000,
          'top': $(this).offset().top,
          'left': $(this).offset().left
        }).on('mouseout', function(e) {
          $(document).find('#temp_edit_box').remove();
          $this.text($(this).val());
        });
        return;
      }

      var snippet_select = $('body #tlist').html();

      $('body').prepend('<form class="grade-1">' + snippet_select + '<input type="text" id="temp_edit_box" name="temp" class="temp" value ="' + $(this).attr('class') + '"/><button class="button tiny alert remove_item"> x </button></form>');
      $('#temp_edit_box').parent().css({
        'position': 'absolute',
        'z-index': 1000,
        'top': ($(this).offset().top - 40),
        'left': ($(this).offset().left + 80),
        'height': 'auto',
        'width': (($this.width() + 20) + 'px')
      });

      $('.remove_item').on('click', function(e) {
        e.preventDefault();
        $this.remove();
        $('body form.grade-1').remove();
      });

      $('#temp_edit_box').css({
        'overflow': 'hidden',
        'width': '80%',
        'margin-left': '20px',
        'margin-top': '10px'
      });

      $('form.grade-1').on('mouseleave', function(e) {
        $(this).remove();
        $this.attr('class', $(this).find('input').val());
      });

      $('form.grade-1 select').on('change', function(e) {
        var args = {
          'file': '../templates.php',
          'part': $(this).val()
        }
        $this.wrap('<div class="temp_wrap"></div>');
        js_php('loader', 'acquire', args, function(data) {
          $('body').find('.temp_wrap *').remove();
          $('body').find('.temp_wrap').append(data).find('.hidden_element').wrap('<div class="textbox menu-item"></div>').parent().resizable().draggable().find('.hidden_element').removeClass('hidden_element').parent().unwrap('.temp_wrap');
        });
      })
    });

    $this.draggable({
      stop: function(e) {
        scan_map($(this));
        last_item_selected = $(e.target);
        if ($(this).parent().attr('id') != 'el_id_0') {
          $(this).css({
            'left': 0,
            'top': 0,
            'position': 'relative'
            //'border'   :  ($(this).is('div')) ? '#000 solid thin' : 'none'
          });
        }
      }
    });


    $this.on('mouseover', function(e) {
      if ($(e.target).hasClass('grid-element')) {
        $(e.target).css('box-shadow', '0px 0px 21px 1px #000');
        //$(e.target).get_box_controls();
      }
      if (e.shiftKey) {
        $(this).css('border', 'red solid 3px');
        $(document).on('keydown', function(e) {
          if (e.which == 68) {
            $this.remove();
            return;
          }
        });
        $(document).on('keyup', function(e) {
          if (e.shiftKey) $(this).css('border', 'none');
        });
      }
    });

    return $this;
  }

  $.fn.clone_box = function() {
    ele_inc++;
    $(this).clone().attr('id', 'el_id_' + ele_inc).resizable().resizable('destroy').draggable().draggable('destroy').set_insertion_defaults().insertAfter($(this));
    return $('#el_id_' + ele_inc);
  }

  $.fn.control_float = function(direction) {
    if (direction == 'left') return $(this).css('float', 'left');
    if (direction == 'right') return $(this).css('float', 'right');
  }


  function release_item($o) {
    $o.find('.hide').remove();

    if ($o.find('.hidden_element').length > 0) {
      $o.find('.hidden_element').show();
      $o.addClass('element-shown');
    }
    // foundation
    if ($o.hasClass('rw')) {
      $o.removeClass('rw').addClass('row');
    }
    if ($o.hasClass('f-btn')) {
      $o.css({
        'min-height': 'initial',
        'min-width': 'initial'
      });
      $o.removeClass('f-btn').addClass('medium').addClass('button').text('a button');
    }

    if ($o.hasClass('eight-c')) {
      $o.removeClass('eight-c').addClass('eight').addClass('columns');
    }

    if ($o.hasClass('six-c')) {
      $o.removeClass('six-c').addClass('six').addClass('columns').css('height', 'auto');
    }

    if ($o.hasClass('self_createdbox')) {
      $o.attr('style', $o.attr('style').replace(/background(.*)/, ''));
      $o.find('span').remove();
    }

  }


  $(document).mousedown(function(e) {

    if (e.metaKey) {

      $('<input name="gg" id="element_activator" class="ui-element" value="text">').prependTo('body');
      $('#element_activator').css({
        'left': e.pageX - 50,
        'top': e.pageY - 60,
        'position': 'absolute',
        'z-index': '4000'
      });
/* setTimeout(function(){ 
 $('#colorwheel').css({
 'left' : e.pageX - 50,
 'top'  : e.pageY - 60,
 'position' : 'absolute',
 'z-index' : '4000',
 }).show();
 },100) */
    }


    if ($(e.target).attr('id') == 'temp_edit_box') return;
    if ($main.find('.create_box').length > 1) return false;
    if (e.shiftKey) {
      e.preventDefault();
      var $create_box = $('<div class="create_box menu-item"><span></span></div>');
      if ($main.find('.create_box').length > 0) $('.create_box').remove();
      $create_box.css({ //defaults
        'top': e.offsetY - 5,
        'left': e.offsetX - 5,
        'width': '10px',
        'height': '10px',
        'position': 'absolute',
        'background': '#00FFFF',
        'box-sizing': 'border-box',
        'border': '#29ABE2 dotted 2px',
        'opacity': '0.6'
      }).addClass('self_createdbox');

      $main.append($create_box);
      $create_box = $('.create_box');

      $(document).on('mousemove', function(e) {
        $create_box.css({
          'width': e.offsetX + 20,
          'height': e.offsetY + 20,
        });
        $create_box.find('span').text('width: ' + $create_box.width() + 'px x height: ' + $create_box.height() + 'px');
        is_mouse_moving = true;
      });

      $(document).on('mouseup', function(e) {
        if ($(e.target).hasClass('menu-item')) last_item_selected = $(e.target);
        $(document).off('mousemove');
        is_mouse_moving = false;
        setTimeout(function() {
          $('.create_box').remove();
        }, 100)
        scan_map($create_box);
      });
    }
  });


  function find_home($o) {
    if ($o.hasClass('create_box')) return false;
    var class_attr = $o.attr('class');
    class_attr = class_attr.match(/[a-z]*box/gi);
    class_attr = class_attr[0].replace(/-/gi, '');

    $o.css({
      'position': 'absolute',
      'top': $('.scaff-' + class_attr).position().top,
      'left': $('.scaff-' + class_attr).position().left
    }).data('excludeBox', '');
  }


  function is_overlap($o, $parent) {
    var truth = false;
    $parent.find('.grid-element').each(function() {
      if (is_offset_inside($o, $(this), 50)) {
        truth = true;
        return;
      }
    })
    return truth;
  }


  $.fn.set_auto = function() {
    if ($(this).attr('id') == 'el_id_0') return false;
    if ($(this).find('.clearbox').length == 0) return false;
    return $(this).css('height', 'auto');
  }


  function scan_map($o) {
    set_grid();
    if (is_resizing) return false;
    for (i = 0; i < grid_map.length; i++) {
      var $gm = $('#' + grid_map[i]);

      $gm.set_auto();

      if ($gm.attr('id') == $o.data('excludeBox')) continue;
      if (!is_offset_inside($o, $gm)) continue;
      if ($o.parent().hasClass('grid-element') && is_overlap($o, $gm, null)) continue;

      light($gm.attr('id'), function() {
        $o.data('excludeBox', $gm.attr('id'));
        if (!$o.hasClass('grid-element')) {
          ele_inc++;
          $o.clone().removeClass('create_box').data('excludeBox', $o.data('excludeBox')).set_insertion_defaults().appendTo($gm);
          find_home($o);
        } else {
          $o.appendTo($gm);
        }
        next_highest_depth += 1;
        $('#menu .menu-item').css('z-index', next_highest_depth);
        css_scafold = create_css_scafold();
        smart_update_css_array();
      });
    }

  }


  function control_zindex($o, direction) {

    var current_zindex = parseInt($o.css('z-index'));
    next_highest_depth = current_zindex + 2;
    $('#menu .menu-item').css('z-index', next_highest_depth);

    if (direction == 'increase') $o.css('z-index', current_zindex + 1);

    if (direction == 'decrease') $o.css('z-index', current_zindex - 1);

  }

  function light(id, callback) {
    $o = $('#' + id);
    $bg_store = $o.css('background-color');
    $o.css('background-color', '#FFF');
    setTimeout(function() {
      $o.css('background-color', $bg_store)
    }, 100);
    callback();
  }

  function add_snippet() {

  }


  function is_offset_inside($a, $b, buffer) {

    var t1 = $a.offset().top;
    var b1 = t1 + $a.height();
    var l1 = $a.offset().left
    var r1 = l1 + $a.width();

    var t2 = $b.offset().top;
    var b2 = t2 + $b.height();
    var l2 = $b.offset().left

    var r2 = l2 + $b.width();

    return (t1 > t2 && b1 < b2 && l1 > l2 && r1 < r2) ? true : false;
  }


  $('.menu-item').draggable();

  $('.menu-item').on('mouseup', function(e) {

    if ($(this).attr('id') == 'snip-add') {
      add_snippet();
    }
    if ($(e.target).hasClass('grid-element')) last_item_selected = $(e.target);

    scan_map($(this));
  })

  $(document).on('keydown', function(e) {
    if (e.which == 221 && e.shiftKey == true) {
      control_zindex($(last_item_selected), 'increase');
    }

    if (e.which == 219 && e.shiftKey == true) {
      control_zindex($(last_item_selected), 'decrease');
    }

    if (e.which == 37 && e.shiftKey == true) {
      $(last_item_selected).control_float('left');
    }

    if (e.which == 39 && e.shiftKey == true) {
      $(last_item_selected).control_float('right');
    }
  });

  $(document).on('keyup', function(e) {
    if (e.metaKey == false) $('#colorwheel').hide().css('bottom', 0);
  })

  set_grid();

  $('#colorpicker').farbtastic(function callback(color) {
    $l = $(last_item_selected);
    $l.css('background', color);
  });

  $.fn.follow = function($o, x, y) {
    var $this = $(this)
    $(document).mousemove(function(e) {
      $o.css({
        'left': $this.offset().left,
        'top': $this.offset().top - $o.height()
      });
    });
    return $(this);
  }

  $.fn.get_box_controls = function(toggle) {
    if (toggle == 'hide' && $('body').find('#box_controls').length == 1) {
      $('#box_controls').hide();
      //	$(this).follow($('#box_controls'));
      return;
    }
    if ($('body').find('#box_controls').length == 1) {
      //	$(this).follow($('#box_controls'));
      return;
    }
    if (is_resizing) return;

    var $control_box = $('<div id="box_controls" for="' + $(this).attr('id') + '"></div>');

    $(this).prepend($control_box);

    $('#box_controls').css({
      'left': $this.position().left,
      'top': $this.position().top
    })

    //	$(this).follow($control_box, 'right');
    return $(this);
  }

  window.export_html_to_file = function() {
    // strip html of non-essential classes and attribs
    detach_classes_array = new Array('ui-resizable-handle', 'ui-resizable-n', 'ui-resizable-ne', 'ui-resizable-nw', 'ui-resizable-s', 'ui-resizable-se', 'ui-resizable-sw', 'ui-resizable-e', 'ui-resizable-w', 'grid-element', 'ui-draggable', 'ui-resizable', 'self_createdbox', 'menu-item', 'found', 'ui-draggable-dragging', 'regex_remove(box)');

    $('#el_id_0').find('.ui-resizable-handle').remove();

    $('#el_id_0').find('div').each(function() {
      for (dclass in detach_classes_array) {
        if ($(this).hasClass(detach_classes_array[dclass])) $(this).removeClass(detach_classes_array[dclass]);
        if (detach_classes_array[dclass].search('regex') > -1) {
          var regex_remove = detach_classes_array[dclass].match(/\((.*)\)/g);
          regex_remove = regex_remove[0].replace(/\(|\)/g, '');
          if ($(this).attr('class').search(regex_remove) > -1) {
            var reg = new RegExp('(.*)' + regex_remove + '|' + regex_remove + '(.*)', "g");
            var object_regex_class = $(this).attr('class').match(reg)
            $(this).removeClass(object_regex_class[0]);
          }
        }
      }
    });

    $('#el_id_0').find('*').each(function() {
      $(this).removeAttr('id');
      $(this).uniqueId();
    });

    var this_css = '<style>' + make_css_from_object(css_scafold) + '</style>';
    $('#el_id_0').find('*').removeAttr('style');
    var this_html = $('#el_id_0').html();
    $.ajax({
      'url': 'write-file.php',
      'type': 'POST',
      'data': {
        'data_html': this_html,
        'data_css': this_css
      }
    }).complete(function(data) {
      window.location = "/dragbox/download.php?file_name=" + data.responseText;
    })
  }
});


function make_css_from_object(css_array) {
  var css_string = "";
  var cssbefore = css_array;
  var selectorsLength = 0;
  for (c in cssbefore) {
    if (cssbefore[c].styles.length > 0) {
      css_string += ((cssbefore[c] != undefined) ? cssbefore[c].selector + " {\n " : "")
    }
    for (d in cssbefore[c]) {
      for (e in cssbefore[c][d]) {
        if (cssbefore[c][d][e].hasOwnProperty('property')) {
          css_string += ((cssbefore[c][d][e].property != undefined) ? ' ' + cssbefore[c][d][e].property + ":" : "");
          css_string += ((cssbefore[c][d][e].value != undefined) ? cssbefore[c][d][e].value + ";\r\n" : "");
          if (e == cssbefore[c].styles.length - 1) {
            css_string += "} \r\n";
          };
        }
      }
    }
    selectorsLength++;
  }
  return css_string;
}


function in_object(a, b) {
  var inc = 0;
  for (c in a) {
    for (d in a[c]) {
      if (a[c][d] == b) {
        return inc;
      }
      inc++
    }
  }
  return -1;
}

function create_css_scafold() {
  var css_array = new Array();
  var inc = 0;
  $('#el_id_0').find('*').each(function() {
    $(this).data('id', inc);
    var selector = ($(this).attr('id') !== undefined) ? '#' + $(this).attr('id') : $(this)[0].tagName.toLowerCase();
    css_array[inc] = new Array();
    css_array[inc]['id'] = inc;
    css_array[inc]['selector'] = selector
    css_array[inc]['styles'] = new Array();
    inc++;
  });
  return css_array;
}


function convert_object_style_to_string(o) {
  var $newStyles = new Array();
  for (a in o) {
    $newStyles[a] = o[a].selector + "{" + o[a].style + "}";
  }
  return (("<style>" + $newStyles.join(';') + "</style>").replace(/\,/g, ';')).replace(/\'\"/g, ' ');
}

function smart_update_css_array() {
  $('#el_id_0').find('*').each(function() {
    var temp_css_and_property = ($(this).attr('style') != undefined) ? $(this).attr('style').split(';') : null;
    var temp;
    for (tc in temp_css_and_property) {
      if (temp_css_and_property[tc].search(/\:/) > -1) {
        temp = temp_css_and_property[tc].split(':');
        update_css_array(css_scafold, $(this), temp[0], temp[1]);
      }
    }
  });
}

function update_css_array(css_array, obj, css_property, p_value) {
  var id = obj.data('id');
  var cap = css_array[id].styles;
  var oToAdd = {
    'property': css_property,
    'value': p_value
  }

  if (in_object(cap, css_property) > -1) {
    var this_index = in_object(cap, css_property);
    cap[((this_index == 0) ? 0 : this_index - 1)].value = p_value;
  }
  if (in_object(cap, css_property) == -1) {
    cap.push(oToAdd)
  }
}


function js_php(php_class, class_method, method_args, callback) {
  var flat_args = JSON.stringify(method_args);
  $.ajax({
    'url': 'library/js_php_classport.php',
    'type': 'POST',
    'data': {
      'post_class': php_class,
      'post_method': class_method,
      'post_method_args': flat_args
    }
  }).complete(function(data) {
    callback(data.responseText);
  });
}
