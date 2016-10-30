<scanner>
  <div if={showVideoScanner}>
    <video id="cameraOutputt"
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
  </div>

  <div if={showImageScanner}">
    <input type="file" accept="image">

    <img src="./-data/img/10000000 - visit virttruhe.tumblr.com.png"
         id="img">
    <hr>
  </div>

  <div if={showTextScanner}>
    <input title="itemId"
           type="text"
           class={invalid:isInvalid}
           oninput={scanInput}>
    <hr>
  </div>

  <vt-button-bar
      class="context-actions"
      buttons={data.buttonList}>
  </vt-button-bar>


  <script>
    var Utility = app.services.utility;
    var Dialog = app.services.dialog;
    var Items = app.services.items;
    var qr = new QCodeDecoder();

    this.showTextScanner = true;
    this.showImageScanner = true;
    this.showVideoScanner = false;
    this.isInvalid = true;
    this.data = {
      isScanning: null,
      buttonList: [
        {
          label: 'stop',
          icon: 'cancel',
          action: 'toInventory',
          disabled: false
        }
      ]
    };

    var handleVideoError = function (e) {
      Dialog.newDialog(e);
      throw new Error(e);
    }.bind(this);

    var decodeFromVideo = function (video) {
      qr.decodeFromCamera(video, function (error, result) {
        if (error) {
          handleVideoError(error)
              .catch(riot.route('inventory'));
        }
        this.stopScan();
        Dialog.newDialog(result);
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

    var normalizeInput = function (something) {
      if (something.constructor === Event) {
        return something.srcElement.value;
      }
    };

    this.scanInput = function (input) {
      var text = normalizeInput(input);
      var result = Items.checkCode(text);
      if (result) {
        this.isInvalid = false;
        Dialog.newDialog('You have found: ' + result);
      }
    };

    this.hasWebcam = function() {
      return DetectRTC.hasWebcam;
    };

    this.canVideoScan = function () {
      return app.services.utility.canVideoScan();
    };

    this.startScan = function () {
      if (!this.showVideoScanner) {
        return;
      }
      if (!Utility.canVideoScan()) {
        var message = 'this device cannot use the video scanner';
        Dialog.newDialog(e);
        return;
      }
      console.log('starting scan');
      this.data.isScanning = true;
      this.update();
      decodeFromVideo(this.cameraOutput);
    }.bind(this);

    this.stopScan = function () {
      if (!this.data.isScanning){
        return;
      }
      console.log('stopping scan');
      this.data.isScanning = false;
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