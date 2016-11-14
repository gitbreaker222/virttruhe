app.services.utility = {
  validate: function (opts, types) {
    var names = Object.keys(opts);
    names.forEach(function (name) {
      var expectedType = types[name];
      var actualType = typeof opts[name];
      if (!expectedType.includes(actualType)) {
        throw new TypeError('Expected ' + expectedType + '. Instead got: ' + actualType);
      }
    });
  },
  isBB10: function () {
    return window.navigator.userAgent.includes('BB10');
  },
  detectRTC: function () {
    var callback = function () {
      app.trigger('finishedPreparing');
    };
    if (!this.isBB10()) {
      DetectRTC.load(callback);
    } else {
      DetectRTC.hasWebcam = true;
      callback();
    }
  },
  canVideoScan: function () {
    return DetectRTC.hasWebcam;
  }
}
;
