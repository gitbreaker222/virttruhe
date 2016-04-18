'use strict';

var app = {};


//// mithril demo code
//model
app.PageList = function() {
  return m.request({method: "GET", url: "pages.json"});
};

//controller
app.controller = function() {
  var pages = app.PageList();
  return {
    pages: pages,
    rotate: function() {
      pages().push(pages().shift());
    }
  }
};

//view
app.view = function(ctrl) {
  return [
    ctrl.pages().map(function(page) {
      return m("a", {href: page.url}, page.title);
    }),
    m("button", {onclick: ctrl.rotate}, "Rotate links")
  ];
};


//initialize
m.mount(document.getElementById("example"), app);