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
    var qr = new QCodeDecoder();

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
     var decodeFromImage = function (img) {
     qr.decodeFromImage(img, function (error, result) {
     if (error) {
     console.log(error);
     return;
     }
     alert(result);
     }, true);
     }
     */

    this.startScan = function () {
      console.log('starting scan');
      this.update();
      decodeFromVideo(this.cameraOutput);
    }.bind(this);

    this.stopScan = function () {
      console.log('stopping scan');
      cameraOutput.pause();
      cameraOutput.src = null;
      qr.stop();
    }.bind(this);

    this.on('show', this.startScan);
    this.on('hide', this.stopScan);
  </script>
</scanner>