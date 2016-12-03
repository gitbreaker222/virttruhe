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
  var instantiate = function () {
    app.state = new app.models.State();
    app.inventory = new app.models.Inventory();
    app.scanner = new app.models.Scanner();
    app.trigger('initInstances');
  };
  
  // start initialization
  riot.observable(app);
  app.services.utility.detectRTC();
  vex.defaultOptions.className = 'vex-theme-default';
  instantiate();
  
  app.inventory.trigger('loadItems');
  // app.inventory.addItem('beer');
  
  // mount all riot tags and start the router
  riot.mount('*');
  riot.route.start(true);
};
/*
 APP.JS END
 */
