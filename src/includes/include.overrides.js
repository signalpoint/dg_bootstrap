dg.b = function(text, options) {
  if (!options) { options = {}; }
  dg.elementAttributesInit(options);
  var type = options._type ? options._type : 'default';
  dg_bootstrap.addBtnClasses(options, type);
  if (!options._value) { options._value = text; }
  return dg.theme('button', options);
};

dg.bl = function(text, path, options) {
  if (!options) { options = {}; }
  dg.elementAttributesInit(options);
  var type = options._type ? options._type : 'link';
  dg_bootstrap.addBtnClasses(options, type);
  return dg.l(text, path, options);
};

dg_bootstrap.addBtnClasses = function(variables, type) {
  var classNames = variables._attributes.class;
  if (!dg.inArray('btn', classNames)) { classNames.push('btn'); }
  if (!dg.inArray('btn-' + type, classNames)) { classNames.push('btn-' + type); }
};
