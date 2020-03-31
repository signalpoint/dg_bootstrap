# bootstrap

> The DrupalGap module for Bootstrap 4.

- http://getbootstrap.com/

## Installation

Include these files in the `<head>` of your app's `index.html` file:

```
<!-- DrupalGap Modules -->
<script src="modules/contrib/bootstrap/bootstrap.js"></script>

<!-- DrupalGap Theme -->
<!-- ## Include a Bootstrap compatible DrupalGap theme's .js file here (e.g. the core burrito theme) ## -->

<!-- OPTIONAL, jQuery (for Bootstrap) -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>

<!-- BEGIN: BOOTSTRAP-->

PASTE BOOTSTRAP INCLUDES HERE

<!-- END: BOOTSTRAP-->

```

You can get the Bootstrap includes here: http://getbootstrap.com/getting-started/

The Bootstrap files to include in your `<head>` are:

- Latest compiled and minified CSS
- Optional theme (*this really is optional*)
- Optional, latest compiled and minified JavaScript

### Examples

## Block navigation bar

```
example.blocks = function() {
  var blocks = {};

  blocks['example_navbar'] = {
    build: function() {
      return new Promise(function(ok, err) {
        var content = {};
      
        var isAuthenticated = dg.currentUser().isAuthenticated();
      
        // Primary links.
        var primary = [  ];
        if (isAuthenticated) {
          if (dg.currentUser().hasRole('administrator')) {
            primary.push(dg.l(dg.t('Groups'), 'groups'));
          }
        }
      
        // Secondary links.
        var secondary = [];
        if (isAuthenticated) {
          secondary.push(dg.l(dg.t('My account'), 'member/' + dg.currentUser().id()));
          secondary.push(dg.l(dg.t('Logout'), 'user/logout));
        }
      
        // Build the navbar.
        content.menu = {
          _theme: 'bootstrap_navbar',
          _logo: dg.theme('image', {
            _path: 'themes/melvin/images/icon.png',
            _attributes: {
              alt: dg.config('title') + ' logo',
              title: dg.config('title')
            }
          }),
          _primary: primary,
          _secondary: secondary
        };
      
        ok(content);
        
      });
    }
  };

  return blocks;
};

```

Then to display the navigation bar, you would typically add the `example_navbar` block to the `header` region of your theme's configuration in the `settings.js` file:

```
// My bootstrap navbar.
example_navbar: { },
```

## navigation bar

We can also quickly render a navigation bar without the overhead of building a block by utilizing `dg.theme()`:

```
// var primary = @see above.
// var secondary = @see above.
var html = dg.theme('bootstrap_navbar', {
  _logo: dg.theme('image', {
    _path: 'themes/melvin/images/icon.png',
    _attributes: {
      alt: dg.config('title') + ' logo',
      title: dg.config('title')
    }
  }),
  _primary: primary,
  _secondary: secondary
});
```

## list group

[List group custom content](http://getbootstrap.com/components/#list-group-custom-content) 
```
var data = { /* get your data from somewhere */}
var items = [];
for (var i = 0; i < data.results.length; i++) {
  var row = data.results[i];
  items.push({
    _text: row.name,
    _attributes: {
      href: '#member/' + row.uid
    }
  });
}

var html = dg.theme('bootstrap_item_list', {
  _items: items,
  _type: 'div',
  _itemType: 'a'
});
```

## [alerts](https://www.w3schools.com/bootstrap/bootstrap_alerts.asp)
```
var infoHtml = dg.theme('message', {
  _message: dg.t('Hello world')
});
var infoHtml = dg.theme('message', {
  _message: dg.t('Goodbye world'),
  _type: 'danger'
});
```
