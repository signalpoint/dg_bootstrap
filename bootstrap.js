dg.modules.bootstrap = new dg.Module();

/**
 * Implements hook_regions_build_alter().
 */
function bootstrap_blocks_build_alter(blocks) {

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
            document.getElementById(blocks.main_menu._attributes.id + '-button').innerHTML = spans;
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
function bootstrap_block_view_alter(element, block) {

  switch (block.get('id')) {

    // Make the main menu into a navbar.
    case 'main_menu':
      element.menu._weight = 1;
      element.menu._attributes['class'].push('nav', 'navbar-nav');
      break;

    // Make the authenticated user login block controls into a navbar.
    case 'user_login':
      if (dg.currentUser().isAuthenticated()) {
        element.menu._attributes['class'].push('nav', 'navbar-nav', 'navbar-right');
      }
      break;

    // Make the powered by block into a navbar.
    case 'powered_by':
      element.list._items.push(dg.l('Bootstrap', 'http://getbootstrap.com'));
      element.list._items.reverse();
      element.list._attributes['class'].push('navbar');
      break;

  }

}

/**
 * Implements hook_form_alter().
 */
function bootstrap_form_alter(form, form_state, form_id) {
  return new Promise(function(ok, err) {

    form._attributes['role'] = 'form';
    form._after_build.push('bootstrap.afterBuild');

    // Add bootstrap attributes to form elements.
    for (var name in form) {
      if (!dg.isFormElement(name, form)) { continue; }
      var el = form[name];
      switch (el._type) {
        case 'actions':
          for (var _name in el) {
            if (!dg.isFormElement(name, form)) { continue; }
            dg.modules.bootstrap.formElementAddAttributes(el[_name]);
          }
          break;
        default:
          dg.modules.bootstrap.formElementAddAttributes(el);
          break;
      }
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
 * An after build handler for all forms to prep the form for bootstrap presentation.
 * @param form
 * @param form_state
 */
dg.modules.bootstrap.afterBuild = function(form, form_state) {

  // Add bootstrap attributes to form element containers.
  for (var name in form) {
    if (!dg.isFormElement(name, form) || form[name]._type == 'hidden') { continue; }
    if (!form[name]._attributes) { form[name]._attributes = { 'class': [] }; } // @TODO figure out why this would be null.
    if (!jDrupal.inArray('form-group', form[name]._attributes['class'])) {
      form[name]._attributes['class'].push('form-group');
    }
  }

};

/**
 * A helper function to prep form elements for bootstrap presentation.
 * @param el
 */
dg.modules.bootstrap.formElementAddAttributes = function(el) {
  switch (el._type) {
    case 'submit':
      switch (el._button_type) {
        case 'primary':
        default:
          el._attributes['class'].push('btn btn-primary');
          break;
      }
      break;
    case 'textarea':
    case 'textfield':
    case 'password':
    case 'select':
      el._attributes['class'].push('form-control');
      break;
    default:
      break;
  }
};
