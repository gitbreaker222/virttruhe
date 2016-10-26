app.services.dialog = {
  newDialog: function (message, type) {
    //validation
    if (!message || message === '') {
      throw new Error('please provide a message string. Got: '+ message);
    }
  
    switch (type) {
      case 'confirm':
        return confirm(message);
      default: alert(message);
    }
  }
};