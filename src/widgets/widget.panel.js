/**
 * Themes a bootstrap panel.
 * @param variables
 *  _type {String} default, primary, success, info, warning or danger
 *  _heading {String}
 *  _body {String}
 *  _footer {String}
 * @returns {string}
 */
dg.theme_bootstrap_panel = function(variables) {
  var type = variables._type ? variables._type : 'default';
  variables._attributes.class.push('panel', 'panel-' + type);
  var heading = variables._heading ?
  '<div class="panel-heading">' + variables._heading + '</div>' : '';
  var body = variables._body ?
  '<div class="panel-body">' + variables._body + '</div>' : '';
  var footer = variables._footer ?
  '<div class="panel-footer">' + variables._footer + '</div>' : '';
  return '<div ' + dg.attributes(variables._attributes) + '>' +
      heading +
      body +
      footer +
      '</div>';
};
