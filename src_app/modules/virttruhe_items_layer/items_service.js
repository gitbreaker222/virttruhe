app.services.items = {
  items: [], //todo rename this to data
  getAllItems: function () {
    return this.items;
  },
  getItem: function (itemId) {
    if (!itemId) {
      return null;
    }
    var item = this.items.find(function (item) {
      return item.id === itemId;
    });
    if (!item) {
      window.console.error('no such item: ' + itemId);
      return null;
    }
    return item;
  },
  itemHasAction: function (itemId) {
    var item = this.getItem(itemId);
    return item && item.action;
  }
};

