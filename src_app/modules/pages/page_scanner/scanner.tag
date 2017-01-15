<app-scanner>
  <div if={showVideoScanner}>
    <video id="cameraOutput"
           autoplay>
    </video>
    <span if={!canVideoScan()}
          style="
      min-width: 1rem;
      height: 1rem;
      font-size: 7pt;
      padding: 0 0.2rem;
      background-color: #ce4a55;
      border: 0 transparent;
      border-radius: 1rem;
    "> this device cannot video scan
    </span>
    <hr>
  </div>

  <div if={showImageScanner}">
    <input type="file" accept="image">

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
    var qr = new QCodeDecoder();

    // public properties
    tag.showTextScanner = true;
    tag.showImageScanner = true;
    tag.showVideoScanner = app.services.utility.canVideoScan();

    tag.isInvalid = true;
    tag.isPresenting = false;
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
    function hide (pageName) {
      if (pageName !== 'scanner') return;
      tag.stopScan();
    }

    var normalizeInput = function (something) {
      if (typeof(something) === 'string') {
        return something;
      } else if (something.constructor === Event) {
        return something.srcElement.value;
      } else if (something.type === 'input'){
        return something.target.value;
      } else {
        throw new Error('Exception: Cannot normalize this: ' + something)
      }
    };

    var presentItem = function(item) {
      tag.isPresenting = true;
      callback = function () {
        tag.isPresenting = false;
        riot.route('inventory');
      };
      app.trigger('showDialog', {
        message: 'You have found: ' + item.name,
        primaryAction: callback
      });
    };
    var noItem = function(itemName) {
      //TODO show unsuccess dialog
    };

    var handleVideoError = function (e) {
      window.console.error(e);
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
      if (tag.isPresenting) return;
      var text = normalizeInput(input);
      var result = Scanner.scan(text);
      if (result) {
        tag.isInvalid = false;
      }
    };

    tag.scanVideo = function (video) {
      qr.decodeFromCamera(video, function (error, text) {
        if (error) {
          handleVideoError(error);
          return
        }
        //success
        tag.stopScan();
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
      tag.data.isScanning = false;
      qr.stop();
      tag.cameraOutput.pause();
      tag.cameraOutput.src = null;
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
    tag.on('toInventory', tag.goToInventory);

    // listen to external events
    app.state.on('hidePage', hide);
    Scanner.on('success', presentItem);
    Scanner.on('noSuccess', noItem);
  </script>
</app-scanner>