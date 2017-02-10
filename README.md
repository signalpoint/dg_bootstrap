# bootstrap

> The DrupalGap module for Bootstrap.

- http://getbootstrap.com/

## Installation

Include these files in the `<head>` of your app's `index.html` file:

```
<!-- DrupalGap Modules -->
<script src="modules/contrib/bootstrap/bootstrap.js"></script>

<!-- DrupalGap Theme -->
<!-- ## Include a Bootstrap compatible DrupalGap theme's .js file here (e.g. the core burrito theme) ## -->

<!-- jQuery (for Bootstrap) -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>

<!-- BEGIN: BOOTSTRAP-->

PASTE BOOTSTRAP INCLUDES HERE

<!--  -->
<link rel="stylesheet" href="INSERT_URL_HERE" />

<!--  -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">

<!--  -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>

<!-- END: BOOTSTRAP-->

```

You can get the Bootstrap includes here: http://getbootstrap.com/getting-started/

The Bootstrap files to include in your `<head>` are:

- Latest compiled and minified CSS
- Optional theme (*this really is optional*)
- Latest compiled and minified JavaScript

### Examples

## Block navigation bar

1. Create a block for our navigation bar
2. Implement it's `build` handler
3. Place the block in a region on our theme.

Step 1, create the DrupalGap Block:
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
          secondary.push(dg.l(dg.t('Logout'), 'user/logout, {
            _attributes: {
              onclick: 'cw_go.logoutClick()'
            }
          }));
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
