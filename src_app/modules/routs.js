/*
  ROUTES.JS
 */
riot.route.stop(); //clear all route callbacks

app.currentPage = null;

app.goTo = function (page) {
  if (app.currentPage) {
    app.currentPage.unmount(true);
  }
  app.currentPage = riot.mount(page)[0];
};

riot.route(function() {
  console.info("this page is not defined. Redirect to Inventory");
  riot.route('/inventory', 'Inventory');
});

riot.route('/', function(){
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
