/**
 * An after build handler for all forms to prep the form for bootstrap presentation.
 * @param form
 * @param form_state
 */
dg_bootstrap.afterBuild = function(form, form_state) {

  // Add bootstrap attributes to form element containers.
  for (var name in form) {
    if (!dg.isFormElement(name, form)) { continue; }
    if (typeof form[name]._children === 'undefined') { continue; }

    //|| form[name]._type == 'hidden'

    // @TODO figure out why this would be null.
    // UPDATE - because we instantiate a FormElement in dg.getForm(), which most likely means
    // the FormElement constructor doesn't have default attributes being set.
    if (!form[name]._attributes) { form[name]._attributes = { 'class': [] }; }

    // Along the way, watch out for checkboxes and radio buttons.
    var hasCheckbox = false;
    var hasRadio = false;

    // Add bootstrap attributes to form elements.
    for (var child in form[name]._children) {

      if (!dg.isFormElement(child, form[name]._children)) { continue; }

      var el = form[name]._children[child];

      if (el._type) {

        if (el._type === 'actions') {
          for (var _name in el) {
            if (!dg.isFormElement(_name, el)) { continue; }
            dg_bootstrap.formElementAddAttributes(el[_name]);
          }
        }

      }
      else {

        dg_bootstrap.formElementAddAttributes(el);

      }

      if (child === 'element') {
        var elementType = el.element._type;
        if (elementType === 'checkbox') { hasCheckbox = true; }
        if (elementType === 'radio') { hasRadio = true; }
      }

    }

    var containerClass =
      hasCheckbox || hasRadio ?
        'form-check' :
        'form-group';

    if (!dg.inArray(containerClass, form[name]._attributes['class'])) {
      var classes = form[name]._attributes['class'];
      classes.push(containerClass);
      classes.push(containerClass + '-' + dg.killCamelCase(name, '-'));
    }

  }

};

/**
 * A helper function to prep form elements for bootstrap presentation.
 * @param el
 */
dg_bootstrap.formElementAddAttributes = function(el) {
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
    case 'checkbox':
    case 'radio':
      el._attributes['class'].push('form-check-input');
      if (!el._label) {
        el._label = {};
        dg.attributesInit(el._label);
      }
      el._label._attributes.class.push('form-check-label');
      break;
    default:
      if (el._type === 'autocomplete') {
        dg_bootstrap.autocompleteInit(el);
      }
      break;
  }
};
