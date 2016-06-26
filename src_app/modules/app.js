/*
  APP.JS
 */
'use strict';

var app = {};
app.services = {};

window.onload = function(){
  riot.mount('info-bar');
  riot.mount('context-action-bar');
  riot.route.start(true);
};
/*
 APP.JS END
 */
