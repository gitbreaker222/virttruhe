/*
 STATE MODEL
 */
app.models.State = function () {
  // Make instances observable
  riot.observable(this);
  
  this.data = {
    settings: {
      videoScanner: null, //boolean
      imageScanner: null, //boolean
      textScanner:  null  //boolean
    },
    currentPage: null     //string
  };
  
  this.getCurrentPageName = function () {
    return this.data.currentPage;
  };
  this.setCurrentPage = function (pageName) {
    if (typeof(pageName) !== 'string') {
      throw new TypeError('Please provide a string as argument');
    }
    this.data.currentPage = pageName;
    app.trigger('showPage', pageName);
  };
};
/*
 STATE MODEL END
 */