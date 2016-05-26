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

riot.route('/inventory', function(){
  console.log('The inventory. ');
  goTo('inventory');
});

riot.route('/scanner', function() {
  console.log('The scanner');
  goTo('scanner');
});
/*
 ROUTES.JS END
 */
