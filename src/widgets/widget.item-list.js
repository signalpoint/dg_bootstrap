dg.theme_bootstrap_item_list = function(variables) {
  if (!jDrupal.inArray('list-group', variables._attributes.class)) {
    variables._attributes.class.push('list-group');
  }
  var items = variables._items ? variables._items : null;
  if (items) {
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (typeof item === 'string') { item = { _text: item }; }
      if (!item._attributes) { item._attributes = {}; }
      if (!item._attributes.class) { item._attributes.class = []; }
      else if (typeof item._attributes.class === 'string') {
        item._attributes.class = [item._attributes.class];
      }
      if (!jDrupal.inArray('list-group-item', item._attributes.class)) {
        item._attributes.class.push('list-group-item');
      }
      variables._items[i] = item;
    }
  }
  return dg.theme('item_list', variables);
};
