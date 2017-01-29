app.services.utility = {
  validate: function (attribute, type) {
    if (typeof attribute !== type) {
      var actualType = typeof attribute;
      window.console.error('Expected ' + type + '. Instead got: ' + actualType);
    }
    return typeof attribute === type;
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
