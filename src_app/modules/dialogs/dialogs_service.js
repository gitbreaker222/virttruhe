app.services.dialog = {
  newDialog: function (message, type, callback) {
    //validation
    if (!message || message === '') {
      throw new Error('please provide a message string. Got: '+ message);
    }
    if (typeof(type) !== 'string'){
      throw new Error('second argument "type" must be a string. Got: ' + typeof(type));
    }
    if (!callback) {
      callback = function () {};
    }
    
    switch (type) {
      case 'confirm':
        vex.dialog.confirm({
          message: message,
          callback: callback
        });
        break;
      case 'error':
        window.console.error(message);
        vex.dialog.alert({
          message: message,
          className: 'vex-theme-default error'
        });
        break;
      default:
        if (type) {
          window.console.info('No case for provided type: "', type, '". Using default');
        }
        vex.dialog.alert({
          message: message,
          callback: callback
        });
    }
  }
};