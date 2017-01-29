/*
 STATE MODEL
 */
app.models.State = function () {
  // Make instances observable
  riot.observable(this);
  
  var currentPage = null;
  
  var data = {
    settings: {
      videoScanner: null, //boolean
      imageScanner: null, //boolean
      textScanner:  null  //boolean
    },
    game: {
      marbles: 0
    }
  };
  this.data = data; // TODO: all data access from outside via methods
  
  this.getCurrentPageName = function () {
    return currentPage;
  };
  this.setCurrentPage = function (pageName) {
    if (typeof(pageName) !== 'string') {
      throw new TypeError('Please provide a string as argument');
    }
    this.trigger('hidePage', currentPage);
    currentPage = pageName;
    app.trigger('showPage', pageName);
  };
  
  this.marbles = function (amount) {//amount[optional] positive or negative number
    if (amount === undefined) return data.game.marbles;
    
    var marbles = data.game.marbles;
    if (!app.services.utility.validate(amount, 'number')) {
      return marbles;
    } else if (amount >= 0) {
      data.game.marbles += amount;
      riot.update();
    } else if (amount < 0 && marbles + amount >= 0) {
      data.game.marbles += amount;
      riot.update();
    } else if (amount < 0 && marbles + amount < 0) {
      window.console.info('cannot take more marbles than available')
      this.trigger('notEnoughMarbles');
    }
    return data.game.marbles;
  };
};
/*
 STATE MODEL END
 */