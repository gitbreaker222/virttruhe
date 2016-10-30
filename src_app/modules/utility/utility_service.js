app.services.utility = {
  isBB10: function () {
    var pos = 0;
    return window.navigator.userAgent.indexOf('BB10') >= pos;
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
