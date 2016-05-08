'use strict';

var app = {};

window.onload = function(){
  //Routes
  riot.route.stop(); //clear all route callbacks
  riot.route.start();

  var routes = {
    inventory: function(action, id) {},
    scanner: function(action, id) {}
  };

  riot.route(function(collection, id, action) {
    console.log('1 ', collection, id, action);
  });

  riot.route('/inventory', function(name) {
    console.log('2 ', 'The inventory. ', name)
  });
  
  riot.route('/scanner', function(name) {
    console.log('3 ', 'The scanner. ', name)
  });

  riot.mount('info-bar');
  riot.mount('inventory');
};