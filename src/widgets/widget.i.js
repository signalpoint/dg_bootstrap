/**
 * Themes a font awesome icon.
 * @param variables
 *  "_text" {String} Optional, text to go inside the icon element.
 * @returns {string}
 */
dg.theme_i = function(variables) {
  var text = variables._text ? variables._text : '';
  return '<i ' + dg.attrs(variables) + '>' + text + '</i>';
};

/**
 * A shortcut to theme a font awesome icon.
 * @param iconClass {String} The font awesome class name, excluding the "fa-".
 * @param text {String} Optional, text to go inside the icon element.
 * @returns {*}
 */
dg.i = function(iconClass, text) {
  var iconVars = {
    _attributes: {
      class: ['fa fa-' + iconClass],
      'aria-hidden': 'true'
    }
  };
  if (arguments[1]) { iconVars._text = arguments[1]; }
  return dg.theme('i', iconVars);
};
