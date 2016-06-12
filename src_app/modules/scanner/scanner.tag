<scanner>

  <h1>has webcam? --> { hasWebcam + '' }#</h1>

  <video id="cameraOutput"
         autoplay="true">


  </video>

  <hr>
  <input type="file" accept="image">


  <img src="./data/img/10000000 - visit virttruhe.tumblr.com.png"
    id="img">


  <script>
    var mediaSupportInfo = app.services.mediaDevicesService,
        qr = new QCodeDecoder();

    var scope = this;
    scope.hasWebcam = mediaSupportInfo.hasWebcam;

    var updateScope = function(){
      scope.hasWebcam = mediaSupportInfo.hasWebcam;
      scope.update();
    };

    mediaSupportInfo.checkDeviceSupport(updateScope);




    /*
    qr.decodeFromCamera(cameraStream, function (error) {
      if (error) return; //throw error;

      alert(result);

    }, true);


    qr.decodeFromImage(img, function (err, result) {
      if (err) return;

      alert(result);
    }, true);
    */
  </script>
</scanner>