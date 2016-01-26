dg.modules.bootstrap = new dg.Module();

/**
 * Implements hook_block_view_alter().
 */
function bootstrap_block_view_alter(element, block) {

  switch (block.get('id')) {

    // Make the main menu into a navbar.
    case 'main_menu':
      var header =
          '<div class="navbar-header">' +
          '<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">' +
          '<span class="sr-only">Toggle navigation</span>' +
          '<span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span>' +
          '</button>' +
          '<a class="navbar-brand" href="#">' + dg.config('title') + '</a>' +
          '</div>';
      element.header = {
        _markup: header
      };
      element.menu._weight = 1;
      element.menu._attributes['class'].push('nav', 'navbar-nav');
      break;

  }

}

/**
 * Implements hook_form_alter().
 */
function bootstrap_form_alter(form, form_state, form_id) {
  return new Promise(function(ok, err) {

    form._attributes['role'] = 'form';

    // Add bootstrap attributes to form elements.
    for (var name in form) {
      if (!dg.isFormElement(name, form)) { continue; }
      var el = form[name];
      switch (el._type) {
        case 'actions':
          for (var _name in el) {
            if (!dg.isFormElement(name, form)) { continue; }
            bootstrapFormElementAddAttributes(el[_name]);
          }
          break;
        default:
          bootstrapFormElementAddAttributes(el);
          break;
      }
    }

    ok();
  });
}

function bootstrapFormElementAddAttributes(el) {
  switch (el._type) {
    case 'submit':
      switch (el._button_type) {
        case 'primary':
        default:
          el._attributes['class'].push('btn btn-primary');
          break;
      }
      break;
    default:
      break;
  }
}
