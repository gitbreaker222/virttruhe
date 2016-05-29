/*
  MEDIA-DEVICES-SERVICE.JS
 */
// based on http://stackoverflow.com/a/30047627/3313410

app.services.mediaDevicesService = {};
var scope = app.services.mediaDevicesService;

if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
  // Firefox 38+ seems having support of enumerateDevices
  navigator.enumerateDevices = function(callback) {
    navigator.mediaDevices.enumerateDevices().then(callback);
  };
}

scope.MediaDevices = [];
scope.isHTTPs = location.protocol === 'https:';
scope.canEnumerate = false;

if (typeof MediaStreamTrack !== 'undefined' && 'getSources' in MediaStreamTrack) {
  scope.canEnumerate = true;
} else if (navigator.mediaDevices && !!navigator.mediaDevices.enumerateDevices) {
  scope.canEnumerate = true;
}

scope.hasMicrophone = false;
scope.hasSpeakers = false;
scope.hasWebcam = false;

scope.isMicrophoneAlreadyCaptured = false;
scope.isWebcamAlreadyCaptured = false;

scope.checkDeviceSupport = function (callback) {
  if (!scope.canEnumerate) {
    return;
  }

  if (!navigator.enumerateDevices && window.MediaStreamTrack && window.MediaStreamTrack.getSources) {
    navigator.enumerateDevices = window.MediaStreamTrack.getSources.bind(window.MediaStreamTrack);
  }

  if (!navigator.enumerateDevices && navigator.enumerateDevices) {
    navigator.enumerateDevices = navigator.enumerateDevices.bind(navigator);
  }

  if (!navigator.enumerateDevices) {
    if (callback) {
      callback();
    }
    return;
  }

  MediaDevices = [];
  navigator.enumerateDevices(function(devices) {
    devices.forEach(function(_device) {
      var device = {};
      for (var d in _device) {
        device[d] = _device[d];
      }

      if (device.kind === 'audio') {
        device.kind = 'audioinput';
      }

      if (device.kind === 'video') {
        device.kind = 'videoinput';
      }

      var skip;
      MediaDevices.forEach(function(d) {
        if (d.id === device.id && d.kind === device.kind) {
          skip = true;
        }
      });

      if (skip) {
        return;
      }

      if (!device.deviceId) {
        device.deviceId = device.id;
      }

      if (!device.id) {
        device.id = device.deviceId;
      }

      if (!device.label) {
        device.label = 'Please invoke getUserMedia once.';
        if (!scope.isHTTPs) {
          device.label = 'HTTPs is required to get label of this ' + device.kind + ' device.';
        }
      } else {
        if (device.kind === 'videoinput' && !scope.isWebcamAlreadyCaptured) {
          scope.isWebcamAlreadyCaptured = true;
        }

        if (device.kind === 'audioinput' && !scope.isMicrophoneAlreadyCaptured) {
          scope.isMicrophoneAlreadyCaptured = true;
        }
      }

      if (device.kind === 'audioinput') {
        scope.hasMicrophone = true;
      }

      if (device.kind === 'audiooutput') {
        scope.hasSpeakers = true;
      }

      if (device.kind === 'videoinput') {
        scope.hasWebcam = true;
      }

      // there is no 'videoouput' in the spec.

      scope.MediaDevices.push(device);
    });

    if (callback) {
      callback();
    }
  });
};
/*
 MEDIA-DEVICES-SERVICE.JS END
 */