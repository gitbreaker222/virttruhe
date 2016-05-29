<scanner>

  <video id="cameraOutput"
         autoplay="true">


  </video>

  <hr>
  <input type="file" accept="image">


  <img src="./data/img/10000000 - visit virttruhe.tumblr.com.png"
    id="img">


  <script>
    var checkDeviceSupport = app.services.mediaDevicesService.checkDeviceSupport;
    var qr = new QCodeDecoder();

    var scope = this;

    checkDeviceSupport(info);

    function info() {
      console.log(app.services.mediaDevicesService)
    }




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