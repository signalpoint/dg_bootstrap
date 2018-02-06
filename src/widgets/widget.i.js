/**
 * Themes a font awesome icon.
 * @param variables
 * @returns {string}
 */
dg.theme_i = function(variables) {
  return '<i ' + dg.attrs(variables) + '></i>';
};

/**
 * A shortcut to theme a font awesome icon.
 * @param iconClass
 * @returns {*}
 */
dg.i = function(iconClass) {
  return dg.theme('i', {
    _attributes: {
      class: ['fa fa-' + iconClass],
      'aria-hidden': 'true'
    }
  });
};
