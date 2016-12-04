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
    if (!this.isBB10()) {
      DetectRTC.load(function () {
        window.console.info('web-rtc detection finished loading');
      });
    } else {
      DetectRTC.hasWebcam = true;
    }
  },
  canVideoScan: function () {
    return DetectRTC.hasWebcam;
  }
}
;
