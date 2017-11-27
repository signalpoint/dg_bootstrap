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
