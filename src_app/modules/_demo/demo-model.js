/*
 DEMO MODEL
 */
app.models.Demo = function () {
  // Make instances observable
  riot.observable(this);
  
  // private properties
  var greetingText = 'Servus';
  
  // private methods
  var greet = function (text) {
    //validation
    text = text || greetingText;
    if (typeof(text) !== 'string') {
      window.console.error('Expected string, instead got: '+typeof(text));
    }
    //console.log(text)
  };
  
  // public methods
  this.test = function () {
    window.console.log('this is a test. Have this app object:', app);
  };
  
  var init = function () {
    greet();
  };
  app.on('initInstances', init);
};
/*
 DEMO MODEL END
 */