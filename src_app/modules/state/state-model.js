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
    currentPage: null  //string
  };
  
  this.getCurrentPage = function () {
    return this.data.currentPageTag;
  };
  this.setCurrentPage = function (value) {
    if (typeof(value) !== 'string') {
      throw new TypeError('Expected tagobject. Got: '+typeof(value));
    }
    this.data.currentPageTag = value;
  };
};
/*
 STATE MODEL END
 */