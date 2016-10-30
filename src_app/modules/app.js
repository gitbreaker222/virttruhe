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
  app.services.utility.detectRTC();
  
  riot.mount('*');
  riot.route.start(true);
};
/*
 APP.JS END
 */
