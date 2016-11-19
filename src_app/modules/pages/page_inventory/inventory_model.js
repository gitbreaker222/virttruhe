/*
  INVENTORY MODEL
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
  
  // public methods
  this.addItem = function (item) {
    //validation
    if (typeof(item) === 'string') {
      item = itemsService.getItem(item);
    }
    if (!item) {
      window.console.Error('No item passed. Please provide an item object to this function.');
      return;
    }
    
    data.items.push(item);
    this.trigger('change itemAdded', item.id);
    return data.items;
  };
  
  this.deleteItem = function (itemId) {
    data.items = data.items.filter(function (item) {
      return item.id !== itemId;
    });
    this.trigger('change itemDeleted', itemId);
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
    this.trigger('change');
    return data.selected;
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