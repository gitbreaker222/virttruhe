app.services.dialog = {
  show: function (dialogObject) {
    app.trigger('showDialog', dialogObject);
  }
};
