/*
 ROUTES.JS
 */
riot.route.stop(); //clear all route callbacks

riot.route(function () {
  // page is not defined. Redirecting
  riot.route('/inventory', 'Inventory');
});

riot.route('/', function () {
  // no page defined. Redirecting
  riot.route('/inventory', 'Inventory');
});

riot.route('/intro', function () {
  app.state.setCurrentPage('intro');
});

riot.route('/inventory', function () {
  app.state.setCurrentPage('inventory');
});

riot.route('/scanner', function () {
  app.state.setCurrentPage('scanner');
});
/*
 ROUTES.JS END
 */
