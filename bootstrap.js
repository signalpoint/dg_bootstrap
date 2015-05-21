/**
 * Implements hook_form_alter().
 */
function bootstrap_form_alter(form, form_state, form_id) {
  try {
    form.options.attributes['role'] = 'form';
  }
  catch (error) { console.log('bootstrap_form_alter - ' + error); }
}

