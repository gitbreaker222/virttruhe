/*
  ACTIONS SERVICE
 */
app.services.actions = {
  test: function (param) {
    console.log('test',param)
    app.state.game.marbles += 1;
  }
};