/*
 APP.JS
 */
'use strict';

var app = {};
app.services = {};

window.onload = function () {
  riot.mount('*');
  riot.route.start(true);
  
  DetectRTC.load(function () {
    window.console.info('web-rtc detection finished loading');
  });
};
/*
 APP.JS END
 */
