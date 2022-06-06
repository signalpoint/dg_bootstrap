dg.b = function(text, options) {
  if (!options) { options = {}; }
  dg.elementAttributesInit(options);
  var type = options._type ? options._type : 'primary';
  dg_bootstrap.addBtnClasses(options, type);
  if (!options._value) { options._value = text; }
  return dg.theme('button', options);
};

dg.bl = function(text, path, options) {
  if (!options) { options = {}; }
  dg.elementAttributesInit(options);
  var type = options._type ? options._type : 'link';
  dg_bootstrap.addBtnClasses(options, type);
  if (!options._attributes.role) { options._attributes.role = 'button'; }
  return dg.l(text, path, options);
};

dg_bootstrap.addBtnClasses = function(variables, type) {
  var classNames = variables._attributes.class;
  var btnTypeClass = 'btn-' + type;
  var hasBtnClass = dg.inArray('btn', classNames);
  var hasBtnTypeClass = dg.inArray(btnTypeClass, classNames);
  var addBtnTypeClass = true;
  if (type === 'link' && dg_bootstrap.hasOutlineClass(variables)) { addBtnTypeClass = false; }
  if (!hasBtnClass && !hasBtnTypeClass && addBtnTypeClass) { classNames.unshift('btn', btnTypeClass); }
  else {
    if (!hasBtnClass) { classNames.unshift('btn'); }
    if (!hasBtnTypeClass && addBtnTypeClass) { classNames.push(btnTypeClass); }
  }
};

// @see widgets.message.js
//dg_theme.message = function(variables) { /* ... */ };
