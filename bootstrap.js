dg.modules.bootstrap = new dg.Module();

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
