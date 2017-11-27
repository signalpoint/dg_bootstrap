/**
 * Returns an html string for a bootstrap navbar menu.
 * @param variables {Object}
 *    _title {String} The title of the navbar, default's to the app's title config.
 *    _primary {Array} An array of primary links (strings)
 *    _secondary {Array} An array of secondary links (strings)
 * @returns {string}
 * @see https://getbootstrap.com/examples/navbar/
 */
dg.theme_bootstrap_navbar = function(variables) {
  var logo = variables._logo ? variables._logo : null;
  var title = variables._title ? variables._title : dg.config('title');
  var primary = variables._primary ? variables._primary : [];
  var secondary = variables._secondary ? variables._secondary : [];
  var html = '';

  /**
   * HEADER
   */

  var headerWrapperAttributes = {
    class: 'navbar-header'
  };
  var headerButtonAttributes = {
    type: "button",
    class: "navbar-toggle collapsed",
    'data-toggle': "collapse",
    'data-target': "#navbar",
    'aria-expanded': "false",
    'aria-controls': "navbar"
  };

  // Open the header container.
  html +='<div ' + dg.attributes(headerWrapperAttributes) + '>';

  // Add logo.
  if (logo) {
    var logoAnchorAttributes = {
      href: '#',
      class: 'navbar-left'
    };
    html += '<a ' + dg.attributes(logoAnchorAttributes) + '>' + logo + '</a>';
  }

  // Add the toggle menu button.
  html += '<button ' + dg.attributes(headerButtonAttributes) + '>' +
      '<span class="sr-only">' + dg.t('Toggle navigation') + '</span>' +
      '<span class="icon-bar"></span>' +
      '<span class="icon-bar"></span>' +
      '<span class="icon-bar"></span>' +
      '</button>';

  // Add the branding.
  html += '<a class="navbar-brand" href="#">' + title + '</a>';

  // Close the header container.
  html += '</div>';

  /**
   * NAVIGATION BAR
   */

  var navbarAttributes = {
    id: 'navbar',
    class: 'navbar-collapse collapse'
  };

  // Open the navbar container.
  html +='<div ' + dg.attributes(navbarAttributes) + '>';

  // Primary links.
  if (primary.length) {

    var primaryAttributes = {
      class: 'nav navbar-nav'
    };
    html += dg.theme('item_list', {
      _attributes: primaryAttributes,
      _items: primary
    });

  }

  // Secondary links.
  if (secondary.length) {

    var secondaryAttributes = {
      class: 'nav navbar-nav navbar-right'
    };
    html += dg.theme('item_list', {
      _attributes: secondaryAttributes,
      _items: secondary
    });

  }

  // Close the navbar container.
  html += '</div>';

  return html;
};
