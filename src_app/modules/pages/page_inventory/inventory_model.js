/*
  INVENTORY MODEL
 */
app.models.Inventory = function () {
  // Make Inventory instances observable
  riot.observable(this);
  
  var itemsService = app.services.items;
  var actions = app.services.actions;
  
  var data = {
    items: [],
    selected: null
  };
  
  // Private methods
  var use = function (itemId) {
    var item = itemsService.getItem(itemId);
    var name;
    if (item && item.action) {
      name = item.action.name;
      actions[name](item.action);
    }
  };
  
  var loadAllItems = function () {
    data.items = itemsService.getAllItems();
  };
  
  // public methods
  this.addItem = function (item) {
    if (!app.services.utility.validate(item, 'string')){
      window.console.error('No item passed. Please provide an item object to this function.');
      return;
    }
  
    item = itemsService.getItem(item);
    //TODO check if stackable, else app gets unstable when adding an item twice
    data.items.push(item);
    this.trigger('itemAdded', item.id);
    riot.update();
    return data.items;
  };
  
  this.deleteItem = function (itemId) {
    data.items = data.items.filter(function (item) {
      return item.id !== itemId;
    });
    this.trigger('itemDeleted', itemId);
    this.select(null);
    return data.items;
  };
  
  this.select = function (item) {
    if (!item) {
      data.selected = null;
    } else if (typeof(item) !== 'string') {
      throw new TypeError('expected "string". Instead got ' + typeof(item));
    } else {
      data.selected = item || null;
    }
    riot.update();
    return data.selected;
  };
  
  this.getItems = function () {
    return data.items;
  };
  this.getSelected = function (returnWholeObject) {
    if (returnWholeObject) {
      return itemsService.getItem(data.selected);
    }
    return data.selected;
  };
  this.getItemDescription = function (itemId) {
    var item = itemsService.getItem(itemId);
    if (!item) {
      return null;
    }
    return item.name + ':\n' + item.description;
  };
  
  
  var init = function () {
    // Listen to external events
    app.scanner.on('success', this.addItem);
  }.bind(this);
  
  // Listen to events
  this.on('loadItems', loadAllItems);
  this.on('use', use);
  app.on('initInstances', init);
  
};
/*
  INVENTORY MODEL END
 */