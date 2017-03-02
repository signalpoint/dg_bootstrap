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
    // on the appropriate list item if possible.
    case 'primary_local_tasks':
        if (element && element.local_tasks) {
          var tasks = element.local_tasks;
          tasks._attributes['class'].push('nav', 'nav-tabs');
          var currentPath = dg.getPath();
          for (var i = 0; i < tasks._items.length; i++) {
            var item = tasks._items[i];
            if (item._theme == 'list_item' && item._text._path && currentPath == item._text._path) {
              item._attributes.class.push('active');
            }
          }
        }

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

    var workIt = function(el) {
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
    };

    // Add bootstrap attributes to form elements.
    //console.log(form);
    for (var name in form) {
      //if (!dg.isFormElement(name, form)) {
      //  if (!form.hasOwnProperty(name)) { continue; }
      //  var child = form[name];
      //  for (var name2 in child) {
      //    if (!dg.isFormElement(name2, child)) { continue; }
      //    workIt(form[name][name2]);
      //  }
      //  continue;
      //}
      workIt(form[name]);
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
    if (!dg.isFormElement(name, form)) { continue; }
    if (typeof form[name]._children === 'undefined') { continue; }

  //|| form[name]._type == 'hidden'

    // @TODO figure out why this would be null.
    // UPDATE - because we instantiate a FormElement in dg.getForm(), which most likely means
    // the FormElement constructor doesn't have default attributes being set.
    if (!form[name]._attributes) { form[name]._attributes = { 'class': [] }; }
    if (!jDrupal.inArray('form-group', form[name]._attributes['class'])) {
      form[name]._attributes['class'].push('form-group');
    }

    // Add bootstrap attributes to form elements.
    for (var child in form[name]._children) {
      if (!dg.isFormElement(child, form[name]._children)) { continue; }
      var el = form[name]._children[child];
      switch (el._type) {
        case 'actions':
          for (var _name in el) {
            if (!dg.isFormElement(_name, el)) { continue; }
            dg.modules.bootstrap.formElementAddAttributes(el[_name]);
          }
          break;
        default:
          dg.modules.bootstrap.formElementAddAttributes(el);
          break;
      }
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
    case 'email':
    case 'number':
    case 'password':
    case 'select':
    case 'textarea':
    case 'textfield':
    //case 'radios':
      el._attributes['class'].push('form-control');
      break;
    case 'radio':
      //el._attributes['class'].push('radio');
      break;
    default:
      if (el._type == 'autocomplete') {
        bootstrap_autocomplete_init(el);
      }
      break;
  }
};

function bootstrap_autocomplete_init(el) {
  if (!el._text_input) { el._text_input = {}; }
  if (!el._text_input._attributes) { el._text_input._attributes = {}; }
  if (!el._text_input._attributes.class) { el._text_input._attributes.class = []; }
  var classNames = el._text_input._attributes.class;
  if (typeof classNames === 'string') { classNames = classNames.split(' '); }
  el._text_input._attributes.class = classNames;
  el._text_input._attributes.class.push('form-control');
}

dg.theme_bootstrap_autocomplete = function(variables) {
  bootstrap_autocomplete_init(variables);
  return dg.theme('autocomplete', variables);
};

/**
 * OVERRIDES
 */

dg.b = function(text, options) {
  if (!options) { options = {}; }
  dg.elementAttributesInit(options);
  var type = options._type ? options._type : 'default';
  options._attributes.class.push('btn', 'btn-' + type);
  if (!options._value) { options._value = text; }
  return dg.theme('button', options);
};

dg.bl = function(text, path, options) {
  if (!options) { options = {}; }
  dg.elementAttributesInit(options);
  var type = options._type ? options._type : 'link';
  options._attributes.class.push('btn', 'btn-' + type);
  return dg.l(text, path, options);
};

/**
 * WIDGETS
 */

/**
 * Returns an html string for a bootstrap navbar menu.
 * @param variables {Object}
 *    _title {String} The title of the navbar, default's to the app's title config.
 *    _primary {Array} An array of primary links (strings)
 *    _secondary {Array} An array of secondary links (strings)
 * @returns {string}
 * @see https://getbootstrap.com/examples/navbar/
 */
dg.theme_bootstrap_navbar = function(variables) {
  var logo = variables._logo ? variables._logo : null;
  var title = variables._title ? variables._title : dg.config('title');
  var primary = variables._primary ? variables._primary : [];
  var secondary = variables._secondary ? variables._secondary : [];
  var html = '';

  /**
   * HEADER
   */

  var headerWrapperAttributes = {
    class: 'navbar-header'
  };
  var headerButtonAttributes = {
    type: "button",
    class: "navbar-toggle collapsed",
    'data-toggle': "collapse",
    'data-target': "#navbar",
    'aria-expanded': "false",
    'aria-controls': "navbar"
  };

  // Open the header container.
  html +='<div ' + dg.attributes(headerWrapperAttributes) + '>';

  // Add logo.
  if (logo) {
    var logoAnchorAttributes = {
      href: '#',
      class: 'navbar-left'
    };
    html += '<a ' + dg.attributes(logoAnchorAttributes) + '>' + logo + '</a>';
  }

  // Add the toggle menu button.
  html += '<button ' + dg.attributes(headerButtonAttributes) + '>' +
      '<span class="sr-only">' + dg.t('Toggle navigation') + '</span>' +
      '<span class="icon-bar"></span>' +
      '<span class="icon-bar"></span>' +
      '<span class="icon-bar"></span>' +
      '</button>';

  // Add the branding.
  html += '<a class="navbar-brand" href="#">' + title + '</a>';

  // Close the header container.
  html += '</div>';

  /**
   * NAVIGATION BAR
   */

  var navbarAttributes = {
    id: 'navbar',
    class: 'navbar-collapse collapse'
  };

  // Open the navbar container.
  html +='<div ' + dg.attributes(navbarAttributes) + '>';

  // Primary links.
  if (primary.length) {

    var primaryAttributes = {
      class: 'nav navbar-nav'
    };
    html += dg.theme('item_list', {
      _attributes: primaryAttributes,
      _items: primary
    });

  }

  // Secondary links.
  if (secondary.length) {

    var secondaryAttributes = {
      class: 'nav navbar-nav navbar-right'
    };
    html += dg.theme('item_list', {
      _attributes: secondaryAttributes,
      _items: secondary
    });

  }

  // Close the navbar container.
  html += '</div>';

  return html;
};

dg.theme_bootstrap_item_list = function(variables) {
  if (!jDrupal.inArray('list-group', variables._attributes.class)) {
    variables._attributes.class.push('list-group');
  }
  var items = variables._items ? variables._items : null;
  if (items) {
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (typeof item === 'string') { item = { _text: item }; }
      if (!item._attributes) { item._attributes = {}; }
      if (!item._attributes.class) { item._attributes.class = []; }
      else if (typeof item._attributes.class === 'string') {
        item._attributes.class = [item._attributes.class];
      }
      if (!jDrupal.inArray('list-group-item', item._attributes.class)) {
        item._attributes.class.push('list-group-item');
      }
      variables._items[i] = item;
    }
  }
  return dg.theme('item_list', variables);
};

/**
 * Themes a bootstrap panel.
 * @param variables
 *  _type {String} default, primary, success, info, warning or danger
 *  _heading {String}
 *  _body {String}
 *  _footer {String}
 * @returns {string}
 */
dg.theme_bootstrap_panel = function(variables) {
  var type = variables._type ? variables._type : 'default';
  variables._attributes.class.push('panel', 'panel-' + type);
  var heading = variables._heading ?
    '<div class="panel-heading">' + variables._heading + '</div>' : '';
  var body = variables._body ?
    '<div class="panel-body">' + variables._body + '</div>' : '';
  var footer = variables._footer ?
    '<div class="panel-footer">' + variables._footer + '</div>' : '';
  return '<div ' + dg.attributes(variables._attributes) + '>' +
      heading +
      body +
      footer +
  '</div>';
};
