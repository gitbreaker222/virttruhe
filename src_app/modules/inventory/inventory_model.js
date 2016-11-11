/*
  INVENTORY JS
 */
app.models.Inventory = function () {
  // Make Inventory instances observable
  riot.observable(this);
  
  var itemsService = app.services.items;
  
  var data = {
    items: [],
    selected: null
  };
  
  // Private methods
  var select = function (item) {
    if (!item) {
      return data.selected = null;
    } else if (typeof(item) !== 'string') {
      throw new TypeError('expected "string". Instead got ' + typeof(item));
    }
    return data.selected = item || null;
  };
  
  var use = function (itemId) {
    var item = itemsService.getItem(itemId);
    if (item && item.action) {
      //need to pass action name to the actions service
      item.action();
    }
  };
  
  var loadAllItems = function () {
    data.items = itemsService.getAllItems();
  };
  
  
  this.addItem = function (itemId) {
    var item = itemsService.getItem(itemId);
    data.items.push(item);
    this.trigger('addItem', itemId);
    return data.items;
  };
  
  this.deleteItem = function (itemId) {
    data.items = data.items.filter(function (item) {
      return item.id !== itemId;
    });
    this.trigger('deleteItem', itemId);
    return data.items;
  };
  
  this.getItems = function () {
    return data.items;
  };
  this.getSelected = function () {
    return data.selected;
  };
  this.getItemDescription = function (itemId) {
    var item = itemsService.getItem(itemId);
    if (!item) {
      return null;
    }
    return item.name + ':\n' + item.description;
  };
  
  // Listen to events
  this.on('loadItems', loadAllItems);
  this.on('select', select);
  this.on('use', use);
};