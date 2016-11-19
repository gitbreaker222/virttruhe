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

window.onload = function () {
  // helper functions
  var constructInstances = function () {
    // make a new Inventory instance
    app.inventory = new app.models.Inventory();
    app.scanner = new app.models.Scanner();
    app.trigger('initInstances');
  };
  
  // start initialization
  riot.observable(app);
  app.services.utility.detectRTC();
  vex.defaultOptions.className = 'vex-theme-default';
  constructInstances();
  //app.inventory.trigger('loadItems');
  
  // mount all riot tags and start the router
  riot.mount('*');
  riot.route.start(true);
};
/*
 APP.JS END
 */
