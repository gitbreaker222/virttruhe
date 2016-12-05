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
    function finished () {
      this.trigger('finished')
    }
    if (!this.isBB10()) {
      DetectRTC.load(finished);
    } else {
      DetectRTC.hasWebcam = true;
      finished();
    }
  },
  canVideoScan: function () {
    return DetectRTC.hasWebcam;
  }
}
;
