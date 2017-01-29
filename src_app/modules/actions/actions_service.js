/*
  ACTIONS SERVICE
 */
app.services.actions = {
  addMarbles: function (attributes) {
    var amount = attributes.amount;
    if (!app.services.utility.validate(amount, 'number') || amount < 0){
      return;
    }
    app.state.marbles(amount);
  },
  removeMarbles: function (attributes) {
    var amount = attributes.amount;
    if (!app.services.utility.validate(amount, 'number') || amount < 0){
      return;
    }
    app.state.marbles(-amount);
  }
};