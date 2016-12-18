/*
  SCANNER MODEL
 */
app.models.Scanner = function () {
  // Make Inventory instances observable
  riot.observable(this);
  
  // declare used services / components
  var Constants = app.constants;
  var Items = app.services.items;
  var Virttruhe = app.services.virttruhe;
  
  // public methods
  this.scan = function (string) {
    // validation
    if (typeof(string) !== 'string') {
      var message = 'expected string, but got ' + typeof(string);
      return window.console.error(new TypeError(message));
    }
    
    var virttruheCodePattern = Constants.virttruheCodePattern;
    var itemCodePattern = Constants.itemCodePattern;
    var virttruheKey;
    var item;
    
    //helper function
    var noSuccess = function () {
      this.trigger('noSuccess', virttruheKey);
      return null;
    }.bind(this);
    
    // main part
    if (string.match(virttruheCodePattern)) {
      virttruheKey = string.match(virttruheCodePattern)[0];
      item = Virttruhe.open(virttruheKey);
    } else if (string.match(itemCodePattern)) {
      var cutOffDoubleHash = 2;
      var itemId = string.match(itemCodePattern)[0].slice(cutOffDoubleHash);
      item = Items.getItem(itemId);
    }
    
    if (!item) {
      return noSuccess();
    }
    
    this.trigger('success', item);
    return item;
  };
  
  
  var init = function () {
    
  };
  app.on('initInstances', init);
};
/*
  SCANNER MODEL END
 */