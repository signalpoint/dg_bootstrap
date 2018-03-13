dg.theme_bootstrap_item_list = function(variables) {
  var className = 'list-group';
  var classNames = variables._attributes.class;
  if (!dg.inArray(className, classNames)) { classNames.push('list-group'); }
  var items = variables._items ? variables._items : null;
  if (items) {
    for (var i = 0; i < items.length; i++) {
      variables._items[i] = dg_bootstrap.prepListItem(items[i]);
    }
  }
  return dg.theme('item_list', variables);
};

dg_bootstrap.prepListItem = function(item) {
  if (typeof item === 'string') { item = { _text: item }; }
  dg.attributesInit(item);
  var className = 'list-group-item';
  var classNames = item._attributes.class;
  if (!dg.inArray(className, classNames)) { classNames.push(className); }
  return item;
};
