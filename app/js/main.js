/*
  APP.JS
 */
'use strict';

var app = {};
app.services = {};

window.onload = function(){
  riot.mount('info-bar');
  riot.route.start(true);
};
/*
 APP.JS END
 */

/*
  ROUTES.JS
 */
riot.route.stop(); //clear all route callbacks

app.currentPage = null;

var goTo = function(page){
  if (app.currentPage) {
    app.currentPage.unmount(true);
  }
  app.currentPage = riot.mount(page)[0];
};

riot.route(function() {
  console.info("this page is not defined");
});

riot.route('/', function(){
  riot.route('/inventory');
});

riot.route('/inventory', function(){
  goTo('inventory');
});

riot.route('/scanner', function() {
  goTo('scanner');
});

/*
 ROUTES.JS END
 */

riot.tag2('demo', '<form onsubmit="{updateLabel}"> <input type="text" name="inputText"> <button type="submit">Do it!</button> <input type="submit" hidden> </form> <h3>--> {this.text}</h3>', '', '', function(opts) {
        this.updateLabel = function (){
            console.log(this);
            this.text = this.inputText.value;
        }
});
riot.tag2('info-bar', '<header> this is a header from riot.js <input type="text" placeholder="update marbles value" name="inputMarbles" onchange="{updateLabel}"> <a href="#/scanner">scanner</a> <a href="#/inventory">inventory</a> <span class="marbles">marbles: {this.marbles}</span> </header>', '', '', function(opts) {

      this.marbles = this.opts.marbles;

      this.updateLabel = function (){
        this.marbles = this.inputMarbles.value;
        this.inputMarbles.value = "";
      };
});
riot.tag2('inventory', '<ul class="items"> <li each="{items}" class="{selected:isSelected(this)}" onclick="{select}"> <img riot-src="{getImageSource(this)}"> </li> </ul>', '', '', function(opts) {
    var scope = this;

    scope.items = app.getItems();
    scope.selected = null;

    scope.isSelected = function(item){
      return item.id === scope.selected;
    };

    scope.getImageSource = function (item) {
      if (item.image) {
        return 'data/items/img/small/' + item.image;
      }
      return 'data/items/img/small/' + item.id + '.jpg';
    };

    scope.select = function () {
      console.log('previous selected: ', scope.selected);
      scope.selected = this.id;
      console.log('new selected: ', scope.selected);
    }

});

app.getItems = function(){
  return [
    {
      "id":"pine_(closed)",
      "name":"Pine (closed)",
      "image":null,
      "description":"A Pine. They are often put into fires for their cracking sounds",
      "stackable":"false",
      "action":"combine",
      "type":"pine",
      "set":"garden"
    },
    {
      "id":"pine_(open)",
      "name":"Pine (open)",
      "image":null,
      "description":"It's cracked from the heat",
      "stackable":"false",
      "action":"take_seeds",
      "type":"pine",
      "set":"garden"
    },
    {
      "id":"pine_seed",
      "name":"Pine seed",
      "image":null,
      "description":"Can be planted",
      "stackable":"true",
      "action":"combine",
      "type":"seed",
      "set":"garden"
    },
    {
      "id":"pot",
      "name":"Flower pot",
      "image":null,
      "description":"Can grow something",
      "stackable":"false",
      "action":"combine",
      "type":"pot",
      "set":"garden"
    },
    {
      "id":"pot1",
      "name":"Pot with pineshine",
      "image":null,
      "description":"A light emitting flower",
      "stackable":"false",
      "action":null,
      "type":"pot",
      "set":"garden"
    },
    {
      "id":"flower01",
      "name":"Krokus",
      "image":null,
      "description":"...",
      "stackable":"true",
      "action":null,
      "type":"flower",
      "set":"garden"
    },
    {
      "id":"flower02",
      "name":"Tulpe",
      "image":null,
      "description":"...",
      "stackable":"true",
      "action":null,
      "type":"flower",
      "set":"garden"
    },
    {
      "id":"flower03",
      "name":"Rose",
      "image":null,
      "description":"...",
      "stackable":"true",
      "action":null,
      "type":"flower",
      "set":"garden"
    },
    {
      "id":"beer",
      "name":"Beer",
      "image":null,
      "description":"A bottle of cool beer",
      "stackable":"true",
      "action":"drink",
      "type":"alcohol",
      "set":"general"
    },
    {
      "id":"wine",
      "name":"Wine",
      "image":null,
      "description":"A bottle of cheap wine",
      "stackable":"true",
      "action":"drink",
      "type":"alcohol",
      "set":"general"
    },
    {
      "id":"knife",
      "name":"Knife",
      "image":null,
      "description":"Normal kitchen knife",
      "stackable":"false",
      "action":"cut",
      "type":"tools",
      "set":"general"
    },
    {
      "id":"intro",
      "name":"Introduction",
      "image":"memory_card.png",
      "description":"Short and long description about VIRTTRUHE",
      "stackable":"false",
      "action":"listen",
      "type":"message",
      "set":"general"
    },
    {
      "id":"24dtf_song1",
      "name":"Song: 24 days to fall - New Frontiers",
      "image":null,
      "description":"Song from the Album ''A buggle wardshen''",
      "stackable":"false",
      "action":"listen",
      "type":"song",
      "set":"music"
    },
    {
      "id":"24dtf_album01",
      "name":"Album: A buggle wardshen",
      "image":null,
      "description":"Album from ''24 days to fall''",
      "stackable":"false",
      "action":"show_songs",
      "type":"album",
      "set":"music"
    },
    {
      "id":"st_wheel",
      "name":"Steering Wheel",
      "image":null,
      "description":"Part of a car. It is used to steer the car",
      "stackable":"false",
      "action":"combine",
      "type":"element",
      "set":"museum"
    },
    {
      "id":"pedal",
      "name":"Gas pedal",
      "image":null,
      "description":"Part of a car. It is used to increase speed",
      "stackable":"false",
      "action":"combine",
      "type":"element",
      "set":"museum"
    },
    {
      "id":"frame",
      "name":"Car frame",
      "image":null,
      "description":"The skelleton of a car",
      "stackable":"false",
      "action":"combine",
      "type":"element",
      "set":"museum"
    },
    {
      "id":"car_parts1",
      "name":"Frame with steering wheel",
      "image":null,
      "description":"Combination of Frame and steering wheel",
      "stackable":"false",
      "action":"combine",
      "type":"element",
      "set":"museum"
    },
    {
      "id":"car_parts2",
      "name":"Frame with pedal",
      "image":null,
      "description":"Combination of Frame and gas pedal",
      "stackable":"false",
      "action":"combine",
      "type":"element",
      "set":"museum"
    },
    {
      "id":"car1",
      "name":"Mercedes 230 E",
      "image":null,
      "description":"The timeless Mercedes 230 E",
      "stackable":"false",
      "action":null,
      "type":"car",
      "set":"museum"
    },
    {
      "id":"note01",
      "name":"'Crime Scene'",
      "image":null,
      "description":"The body lies face down on the floor. Blood spilled everywhere...",
      "stackable":"false",
      "action":null,
      "type":"note",
      "set":"crime"
    },
    {
      "id":"note02",
      "name":"Clue 'Hat'",
      "image":null,
      "description":"This hat looks like the one from the guy in the bar...",
      "stackable":"false",
      "action":null,
      "type":"note",
      "set":"crime"
    },
    {
      "id":"fingerp_scanner",
      "name":"Finger print scanner",
      "image":null,
      "description":"Search for finger prints on items",
      "stackable":"false",
      "action":"combine",
      "type":"tools",
      "set":"crime"
    },
    {
      "id":"pills",
      "name":"Sleeping Pills",
      "image":null,
      "description":"Super effective Sleeping pills. One is missing",
      "stackable":"false",
      "action":"filler",
      "type":"evidence",
      "set":"crime"
    },
    {
      "id":"fingerprint01",
      "name":"Wifes Finger print",
      "image":null,
      "description":"found on the package of sleeping pills. hmm... as far as I know she has no problem getting to sleep...",
      "stackable":"false",
      "action":null,
      "type":"evidence",
      "set":"crime"
    }
  ];
};

riot.tag2('scanner', '<video id="cameraOutput" autoplay> </video> <button onclick="{stopVideo}"> Stop video </button> <hr> <input type="file" accept="image"> <img src="./data/img/10000000 - visit virttruhe.tumblr.com.png" id="img">', '', '', function(opts) {
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

    mediaSupportInfo.checkDeviceSupport(updateScopeStartScan);
});
/*
 MEDIA-DEVICES-SERVICE.JS
 */
// based on http://stackoverflow.com/a/30047627/3313410

app.services.mediaDevicesService = {};

(function(){
  var scope = app.services.mediaDevicesService;

  if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
    // Firefox 38+ seems having support of enumerateDevices
    navigator.enumerateDevices = function (callback) {
      navigator.mediaDevices.enumerateDevices().then(callback);
    };
  }

  scope.MediaDevices = [];
  scope.isHTTPs = location.protocol === 'https:';
  scope.canEnumerate = false;

  if (typeof MediaStreamTrack !== 'undefined' && 'getSources' in MediaStreamTrack) {
    scope.canEnumerate = true;
  } else if (navigator.mediaDevices && !!navigator.mediaDevices.enumerateDevices) {
    scope.canEnumerate = true;
  }

  scope.hasMicrophone = false;
  scope.hasSpeakers = false;
  scope.hasWebcam = false;

  scope.isMicrophoneAlreadyCaptured = false;
  scope.isWebcamAlreadyCaptured = false;

  scope.checkDeviceSupport = function (callback) {
    if (!scope.canEnumerate) {
      return;
    }

    if (!navigator.enumerateDevices && window.MediaStreamTrack && window.MediaStreamTrack.getSources) {
      navigator.enumerateDevices = window.MediaStreamTrack.getSources.bind(window.MediaStreamTrack);
    }

    if (!navigator.enumerateDevices && navigator.enumerateDevices) {
      navigator.enumerateDevices = navigator.enumerateDevices.bind(navigator);
    }

    if (!navigator.enumerateDevices) {
      if (callback) {
        callback();
      }
      return;
    }

    MediaDevices = [];
    navigator.enumerateDevices(function (devices) {
      devices.forEach(function (_device) {
        var device = {};
        for (var d in _device) {
          device[d] = _device[d];
        }

        if (device.kind === 'audio') {
          device.kind = 'audioinput';
        }

        if (device.kind === 'video') {
          device.kind = 'videoinput';
        }

        var skip;
        MediaDevices.forEach(function (d) {
          if (d.id === device.id && d.kind === device.kind) {
            skip = true;
          }
        });

        if (skip) {
          return;
        }

        if (!device.deviceId) {
          device.deviceId = device.id;
        }

        if (!device.id) {
          device.id = device.deviceId;
        }

        if (!device.label) {
          device.label = 'Please invoke getUserMedia once.';
          if (!scope.isHTTPs) {
            device.label = 'HTTPs is required to get label of this ' + device.kind + ' device.';
          }
        } else {
          if (device.kind === 'videoinput' && !scope.isWebcamAlreadyCaptured) {
            scope.isWebcamAlreadyCaptured = true;
          }

          if (device.kind === 'audioinput' && !scope.isMicrophoneAlreadyCaptured) {
            scope.isMicrophoneAlreadyCaptured = true;
          }
        }

        if (device.kind === 'audioinput') {
          scope.hasMicrophone = true;
        }

        if (device.kind === 'audiooutput') {
          scope.hasSpeakers = true;
        }

        if (device.kind === 'videoinput') {
          scope.hasWebcam = true;
        }

        // there is no 'videoouput' in the spec.

        scope.MediaDevices.push(device);
      });

      if (callback) {
        callback();
      }
    });
  }
})();

/*
 MEDIA-DEVICES-SERVICE.JS END
 */