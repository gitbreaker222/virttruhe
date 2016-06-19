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
      playVideo(scope.cameraOutput);
      //decodeFromVideo(scope.cameraOutput)
    };

    mediaSupportInfo.checkDeviceSupport(updateScopeStartScan);



    var playVideo = function(video){
      navigator.getUserMedia({ "video": true }, function(stream){
        cameraStream = stream;
        video.src = window.URL.createObjectURL(stream);
        video.play();
      }, videoError)
    };

    var _stopVideo = function(video){
      video.pause();
      video.src = null;
      cameraStream.getVideoTracks()[0].stop()
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
  </script>
</scanner>