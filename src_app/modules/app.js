/*
 APP.JS
 */
'use strict';

var app = {
  constants: {},
  settings: {},
  services: {},
  models: {}
};
riot.observable(app);

window.onload = function () {
  // helper functions
  function loadItemData () {
    var url = app.constants.itemDataUrl;
    app.services.loading.one('ready'+url, function (result) {
      result = jsyaml.load(result);
      app.services.items.items = result.items;
    });
    app.services.loading.loadFile(url);
  }
  function instantiate () {
    app.state = new app.models.State();
    app.inventory = new app.models.Inventory();
    app.scanner = new app.models.Scanner();
    app.trigger('initInstances');
  }
  function mountTagsStartRouter () {
    riot.mount('app');
    riot.route.start(true);
  }
  function init () {
    app.services.utility.detectRTC();
    instantiate();
    
    app.inventory.trigger('loadItems');
    //app.inventory.addItem('beer');
    
    mountTagsStartRouter();
  }
  
  // main part
  loadItemData();
  //TODO loadRTCDetection here, not in init
  if (!app.services.loading.isLoading()) {
    init();
  } else {
    app.services.loading.one('ready', init);
  }
};
/*
 APP.JS END
 */
