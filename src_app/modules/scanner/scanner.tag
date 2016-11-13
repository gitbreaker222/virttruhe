<scanner>
  <div if={showVideoScanner}>
    <video id="cameraOutput"
           autoplay>
    </video>
    <span if={canVideoScan()}
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
    <input title="scanText"
           type="text"
           placeholder="#0000FFFF"
           class={invalid:isInvalid}
           oninput={scanInput}>
    <hr>
  </div>

  <vt-button-bar
      class="context-actions"
      buttons={data.buttonList}>
  </vt-button-bar>


  <script>
    var tag = this;

    // private properties
    var Scanner = app.scanner;
    var Dialog = app.services.dialog;
    var qr = new QCodeDecoder();

    // public properties
    tag.showTextScanner = true;
    tag.showImageScanner = true;
    tag.showVideoScanner = true;

    tag.isInvalid = true;
    tag.data = {
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

    // private methods
    var normalizeInput = function (something) {
      if (typeof(something) === 'string') {
        return something;
      } else if (something.constructor === Event) {
        return something.srcElement.value;
      } else {
        throw new Error('Exception: Cannot normalize this: ' + something)
      }
    };

    var presentItem = function(item) {
      callback = function (choice) {
        console.log(choice, item.name);
        riot.route('inventory');
      };
      Dialog.newDialog('You have found: ' + item.name, '', callback);
    };

    var presentNoSuccess = function () {
      //can be deleted
    };

    var handleVideoError = function (e) {
      window.console.error(e);
      riot.route('inventory');
    };


    // public methods
    tag.canVideoScan = function () {
      return app.services.utility.canVideoScan();
    };

    tag.reset = function () {
      var inputElement = this.root.querySelector("[title='scanText']");
      inputElement.value = '';
      tag.isInvalid = true;
    };

    tag.scanInput = function (input) {
      var text = normalizeInput(input);
      var result = Scanner.scan(text);
      if (result) {
        tag.isInvalid = false;
      }
    };

    tag.scanVideo = function (video) {
      qr.decodeFromCamera(video, function (error, text) {
        if (error) {
          handleVideoError(error)
        }
        tag.scanInput(text);
      }, true);
    };
    /*
     this.decodeFromImage = function (img) {
     qr.decodeFromImage(img, function (error, result) {
     if (error) {
     console.log(error);
     return;
     }
     alert(result);
     }, true);
     }
    */

    tag.startScan = function () {
      if (!tag.showVideoScanner) {
        return;
      }
      if (!tag.canVideoScan()) {
        var message = 'this device cannot use the video scanner';
        Dialog.newDialog(message, 'error');
        return;
      }
      console.log('starting scan');
      tag.data.isScanning = true;
      tag.update();
      tag.scanVideo(tag.cameraOutput);
    };

    tag.stopScan = function () {
      if (!tag.data.isScanning){
        return;
      }
      console.log('stopping scan');
      tag.data.isScanning = false;
      tag.cameraOutput.pause();
      tag.cameraOutput.src = null;
      qr.stop();
    };

    tag.goToInventory = function () {
      riot.route('inventory')
    };

    //tag.showVideoScanner = tag.canVideoScan();


    // listen to own events
    tag.on('show', function() {
      tag.reset();
      tag.startScan();
    });
    tag.on('hide', tag.stopScan);
    tag.on('toInventory', tag.goToInventory);

    // listen to external events
    Scanner.on('success', presentItem);
    Scanner.on('noSucces', presentNoSuccess);
  </script>
</scanner>