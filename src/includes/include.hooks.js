/**
 * Implements hook_regions_build_alter().
 */
function dg_bootstrap_blocks_build_alter(blocks) {

  // Turn the main menu into a navbar.
  // @see https://getbootstrap.com/examples/navbar/
  if (blocks.main_menu) {
    blocks.main_menu._attributes.class.push('navbar-collapse', 'collapse', 'navbar-left');
    blocks.main_menu._attributes['aria-expanded'] = 'false';
    blocks.main_menu._attributes['style'] = 'height: 1px;';
    blocks.main_menu._prefix = dg.render({
      _theme: 'container',
      _attributes: {
        'class': ['navbar-header']
      },
      _children: {
        button: {
          _theme: 'button',
          _attributes: {
            id: blocks.main_menu._attributes.id + '-button',
            type: 'button',
            'class': ['navbar-toggle', 'collapsed'],
            'data-toggle': 'collapse',
            'data-target': '#main-menu',
            'aria-expanded': 'false',
            'aria-controls': 'navbar'
          },
          _postRender: [function() {
            var menu = blocks.main_menu._content.menu;
            var spans = '';
            for (var i = 0; i < menu._items.length; i++) {
              if (i == 0) { spans += '<span class="sr-only">Toggle navigation</span>'; }
              else { spans += '<span class="icon-bar"></span>'; }
              spans += '<span></span>';
            }
            var buttons = document.getElementById(blocks.main_menu._attributes.id + '-button');
            if (buttons) { buttons.innerHTML = spans; }
          }]
        },
        brand: {
          _markup: '<a class="navbar-brand" href="#">' + dg.config('title') + '</a>'
        }
      }
    });
  }

}

/**
 * Implements hook_block_view_alter().
 */
function dg_bootstrap_block_view_alter(element, block) {

  switch (block.get('id')) {

    // Make the main menu into a navbar.
    case 'main_menu':
      element.menu._weight = 1;
      element.menu._attributes['class'].push('nav', 'navbar-nav');
      break;

    // Make the user menu into a navbar.
    case 'user_menu':
      element.menu._attributes['class'].push('nav', 'navbar-nav', 'navbar-right');
      break;

    // Make the powered by block into a navbar.
    case 'powered_by':
      element.list._items.push(dg.l('Bootstrap', 'http://getbootstrap.com'));
      element.list._items.reverse();
      element.list._attributes['class'].push('navbar');
      break;

    // Turn the primary local tasks into nav tabs and place an "active" class
    // on the appropriate link if possible.
    case 'primary_local_tasks':
      if (element && element.local_tasks) {
        var tasks = element.local_tasks;
        tasks._attributes['class'].push('nav', 'nav-tabs');
        var currentPath = dg.getPath();
        for (var i = 0; i < tasks._items.length; i++) {
          var item = tasks._items[i];
          if (item._theme == 'list_item') {
            item._attributes.class.push('nav-item');
            var link = item._text;
            link._attributes.class.push('nav-link');
            if (link._path && currentPath == link._path) {
              link._attributes.class.push('active');
            }
          }
        }
      }

      break;

  }

}

/**
 * Implements hook_form_alter().
 */
function dg_bootstrap_form_alter(form, form_state, form_id) {
  return new Promise(function(ok, err) {

    form._attributes['role'] = 'form';
    form._after_build.push('dg_bootstrap.afterBuild');

    var addAttrsToElement = function(el) {
      switch (el._type) {
        case 'actions':
          for (var _name in el) {
            if (!dg.isFormElement(name, form)) { continue; }
            dg_bootstrap.formElementAddAttributes(el[_name]);
          }
          break;
        default:
          dg_bootstrap.formElementAddAttributes(el);
          break;
      }
    };

    // Add bootstrap attributes to form elements.
    //console.log(form);
    for (var name in form) {
      if (!form.hasOwnProperty(name) || !dg.isFormElement(name, form)) { continue; }
      addAttrsToElement(form[name]);
    }

    // Make any specific form alterations.
    switch (form_id) {
      case 'UserLoginForm':

        // Add some classes to the user login block's form to turn it into a navbar located to the right.
        // @TODO this is more specific to the burrito theme than it is to all bootstrap themes, move it to the theme.
        if (dg.config('theme').name == 'burrito' && dg.getPath() != 'user/login') {
          form._attributes['class'].push('navbar-form navbar-right');
        }

        break;
    }

    ok();
  });
}

/**
 * Implements theme_description().
 */
function dg_bootstrap_description(vars) {
  var format = vars._format ? vars._format : 'div';
  var attrs = vars._attributes;
  attrs.class.push('form-text');
  attrs.class.push('text-muted');
  return '<' + format + ' ' + dg.attrs(vars) + '>' + vars._description + '</' + format + '>';
}
