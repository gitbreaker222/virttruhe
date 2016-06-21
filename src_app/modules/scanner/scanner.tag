<scanner>

  <video id="cameraOutput"
         autoplay>
  </video>

  <button onclick="{stopVideo}">
    Stop video
  </button>

  <hr>
  <input type="file" accept="image">

  <img src="./data/img/10000000 - visit virttruhe.tumblr.com.png"
    id="img">



  <script>
    var scope = this,
        mediaSupportInfo = app.services.mediaDevicesService,
        cameraStream,
        qr = new QCodeDecoder();

    scope.stopVideo = function(){
      _stopVideo(scope.cameraOutput)
    };

    var updateScopeStartScan = function(){
      scope.update();
      decodeFromVideo(scope.cameraOutput)
    };

    var _stopVideo = function(video){
      video.pause();
      video.src = null;
      qr.stop();
    };

    var videoError = function(e){
      console.info('webcam may already be in use');
      alert(e);
    };

    var decodeFromVideo = function (video){
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


    mediaSupportInfo.checkDeviceSupport(updateScopeStartScan);
  </script>
</scanner>