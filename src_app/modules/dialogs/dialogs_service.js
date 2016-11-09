app.services.dialog = {
  newDialog: function (message, type, callback) {
    //validation
    if (!message || message === '') {
      throw new Error('please provide a message string. Got: '+ message);
    }
    if (type && typeof(type) !== 'string'){
      throw new Error('second argument "type" must be a string. Got: ' + typeof(type));
    }
  
    switch (type) {
      case 'confirm':
        vex.dialog.confirm({
          message: message,
          callback: callback
        });
        break;
      default:
        vex.dialog.alert({
          message: message
        });
    }
  }
};