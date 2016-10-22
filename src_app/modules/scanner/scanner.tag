<scanner>
  <video id="cameraOutput"
         autoplay>
  </video>
  <span if={hasWebcam()}
       style="
    min-width: 1rem;
    height: 1rem;
    font-size: 7pt;
    padding: 0 0.2rem;
    background-color: green;
    border: 0 transparent;
    border-radius: 1rem;
  "> has webcam
  </span>

  <hr>
  <input type="file" accept="image">

  <img src="./data/img/10000000 - visit virttruhe.tumblr.com.png"
       id="img">

  <vt-button-bar
      class="context-actions"
      buttons={data.buttonList}>
  </vt-button-bar>


  <script>
    var qr = new QCodeDecoder();

    var videoError = function (e) {
      console.info('webcam may already be in use');
      alert(e);
    }.bind(this);

    var decodeFromVideo = function (video) {
      qr.decodeFromCamera(video, function (error, result) {
        if (error) {
          videoError(error);
          return console.log(error);
        }
        this.stopScan();
        alert(result);
      }, true);
    }.bind(this);
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

    this.data = {
      buttonList: [
        {
          label: 'stop',
          icon: 'cancel',
          action: 'toInventory',
          disabled: false
        }
      ]
    };

    this.hasWebcam = function() {
      return DetectRTC.hasWebcam;
    };

    this.startScan = function () {
      console.log('starting scan');
      this.update();
      decodeFromVideo(this.cameraOutput);
    }.bind(this);

    this.stopScan = function () {
      console.log('stopping scan');
      this.cameraOutput.pause();
      this.cameraOutput.src = null;
      qr.stop();
    }.bind(this);

    this.goToInventory = function () {
      riot.route('inventory')
    }.bind(this);

    this.on('show', this.startScan);
    this.on('hide', this.stopScan);
    this.on('toInventory', this.goToInventory)
  </script>
</scanner>