<scanner>
  <video id="cameraOutput"
         autoplay>
  </video>

  <hr>
  <input type="file" accept="image">

  <img src="./data/img/10000000 - visit virttruhe.tumblr.com.png"
       id="img">

  <context-action-bar actions={['stopScan']}>
  </context-action-bar>


  <script>
    var scope = this,
        cameraStream,
        qr = new QCodeDecoder();

    scope.stopScan = function () {
      _stopScan(scope.cameraOutput)
    };

    var startScan = function () {
      scope.update();
      decodeFromVideo(scope.cameraOutput)
    };

    var _stopScan = function (video) {
      video.pause();
      video.src = null;
      qr.stop();
    };

    var videoError = function (e) {
      console.info('webcam may already be in use');
      alert(e);
    };

    var decodeFromVideo = function (video) {
      qr.decodeFromCamera(video, function (error, result) {
        if (error) {
          return console.log(error);
        }
        _stopVideo(video);
        alert(result);
      }, true);
    };
    /*
     qr.decodeFromImage(img, function (error, result) {
     if (error) {
     console.log(error);
     return;
     }
     alert(result);
     }, true);
     */

    //todo: if blackberry browser, skip promise call (in adapter.js, BB10-OS no Promises -_-)

    DetectRTC.load(function () {
      scope.update();
      startScan();
    });

    this.on('before-unmount', function () {
      this.stopScan();
    });
  </script>
</scanner>