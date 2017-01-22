/*
 STATE MODEL
 */
app.models.State = function () {
  // Make instances observable
  riot.observable(this);
  
  var currentPage = null;
  
  this.data = {
    settings: {
      videoScanner: null, //boolean
      imageScanner: null, //boolean
      textScanner:  null  //boolean
    }
  };
  this.game = {
    marbels: 0
  };
  
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
};
/*
 STATE MODEL END
 */