/*
  ROUTES.JS
 */
riot.route.stop(); //clear all route callbacks

app.currentPage = null;

app.goTo = function (pageName) {
  var nextPageTag = riot.vdom.find(function (tag) {
    return tag.root.localName === pageName
  });
  
  if (app.currentPage) {
    app.currentPage.root.classList.remove('show');
    app.currentPage.trigger('hide');
  }
  
  app.currentPage = nextPageTag;
  
  app.currentPage.root.classList.add('show');
  app.currentPage.trigger('show');
};

riot.route(function() {
  console.info("this page is not defined. Redirect to Inventory");
  riot.route('/inventory', 'Inventory');
});

riot.route('/', function(){
  console.info('no page defined. Redirecting to inventory');
  riot.route('/inventory', 'Inventory');
});

riot.route('/inventory', function(){
  app.goTo('inventory');
});

riot.route('/scanner', function() {
  app.goTo('scanner');
});

/*
 ROUTES.JS END
 */
