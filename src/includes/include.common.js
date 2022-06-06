/**
 * Given an vars object, this will return TRUE if it contains a "btn-outline" class name.
 * @param {type} vars
 * @returns {Boolean}
 */
dg_bootstrap.hasOutlineClass = function(vars) {
  var hasClass = false;
  for (var i = 0; i < vars._attributes.class.length; i++) {
    if (vars._attributes.class[i].indexOf('btn-outline') !== -1) {
      hasClass = true;
      break;
    }
  }
  return hasClass;
};
