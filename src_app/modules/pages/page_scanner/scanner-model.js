/*
  SCANNER MODEL
 */
app.models.Scanner = function () {
  // Make Inventory instances observable
  riot.observable(this);
  
  // public methods
  this.scan = function (string) {
    //validation
    if (typeof(string) !== 'string') {
      var message = 'expected string, but got ' + typeof(string);
      return window.console.error(new TypeError(message));
    }
    
    var listOfMatchesInString;
    var virttruheKey;
    var item;
    
    //helper function
    var noSuccess = function () {
      this.trigger('noSuccess', virttruheKey);
      return null;
    }.bind(this);
    
    //logic
    listOfMatchesInString = string.match(app.constants.virttruheCodePattern);
    if (!listOfMatchesInString){
      return noSuccess();
    }
    virttruheKey = listOfMatchesInString[0];
    item = app.services.virttruhe.open(virttruheKey);
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