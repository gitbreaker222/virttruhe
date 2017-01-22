/*
  LOADING SERVICE
 */
app.services.loading = {
  isLoading: function () {return this.loaders.length;},
  loaders: [],
  loadFile: function (url) {
    //based on http://stackoverflow.com/questions/196498/how-do-i-load-the-contents-of-a-text-file-into-a-javascript-variable#196510
    var client = new XMLHttpRequest();
    var loaderIndex;
    
    client.open('GET', url);
    client.onloadend = function () {
      //remove from loaders
      this.loaders.splice(loaderIndex, 1);
      //trigger ready events
      this.trigger('ready'+url, client.responseText);
      if (!this.loaders.length) {
        this.trigger('ready');
      }
    }.bind(this);
    
    //push to loaders
    loaderIndex = this.loaders.length;
    this.loaders.push({
      id: url,
      startTime: Date.now()
    });
    
    client.send();
  }
};
riot.observable(app.services.loading);
/*
 LOADING SERVICE END
 */