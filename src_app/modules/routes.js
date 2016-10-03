/*
 ROUTES.JS
 */
riot.route.stop(); //clear all route callbacks

app.currentPageTag = null;

app.goTo = function (pageName) {
  var nextPageTag = riot.vdom.find(function (tag) {
    return tag.root.localName === pageName;
  });
  
  if (app.currentPageTag) {
    app.currentPageTag.root.classList.remove('show');
    app.currentPageTag.trigger('hide');
  }
  
  app.currentPageTag = nextPageTag;
  
  app.currentPageTag.root.classList.add('show');
  app.currentPageTag.trigger('show');
};

riot.route(function () {
  // page is not defined. Redirecting
  riot.route('/inventory', 'Inventory');
});

riot.route('/', function () {
  // no page defined. Redirecting
  riot.route('/inventory', 'Inventory');
});

riot.route('/inventory', function () {
  app.goTo('inventory');
});

riot.route('/scanner', function () {
  app.goTo('scanner');
});

/*
 ROUTES.JS END
 */
