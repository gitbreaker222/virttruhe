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
  // documents are loaded
  // start initialization
  riot.observable(app);

  function makeInstances () {
    app.state = new app.models.State();
    app.inventory = new app.models.Inventory();
    app.scanner = new app.models.Scanner();
    app.trigger('initInstances');
  }

  (function load () {
    var sequence = [
      app.services.utility.detectRTC(), // promise or not
      makeInstances()
    ];
    // TODO run sequence with something like
    // currentLoad.on('finish', next)
  })();

  app.inventory.trigger('loadItems');
  // app.inventory.addItem('beer');

  // mount all riot tags and start the router
  riot.mount('app');
  riot.route.start(true);
};
/*
 APP.JS END
 */
