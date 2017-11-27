dg_bootstrap.autocompleteInit = function(el) {
  if (!el._text_input) { el._text_input = {}; }
  if (!el._text_input._attributes) { el._text_input._attributes = {}; }
  if (!el._text_input._attributes.class) { el._text_input._attributes.class = []; }
  var classNames = el._text_input._attributes.class;
  if (typeof classNames === 'string') { classNames = classNames.split(' '); }
  el._text_input._attributes.class = classNames;
  el._text_input._attributes.class.push('form-control');
};
