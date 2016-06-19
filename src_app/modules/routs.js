/*
  ROUTES.JS
 */
riot.route.stop(); //clear all route callbacks

app.currentPage = null;

var goTo = function(page){
  if (app.currentPage) {
    app.currentPage.unmount(true);
  }
  app.currentPage = riot.mount(page)[0];
};

riot.route(function() {
  console.info("this page is not defined");
});

riot.route('/', function(){
  riot.route('/inventory');
});

riot.route('/inventory', function(){
  goTo('inventory');
});

riot.route('/scanner', function() {
  goTo('scanner');
});

/*
 ROUTES.JS END
 */
