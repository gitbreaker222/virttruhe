/*
  ROUTES.JS
 */
riot.route.stop(); //clear all route callbacks

app.currentPage = null;

app.goTo = function (pageName) {
  var pageNode = document.querySelector(pageName);
  if (app.currentPage) {
    app.currentPage.classList.remove('show');
  }
  pageNode.classList.add('show');
  app.currentPage = pageNode;
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
