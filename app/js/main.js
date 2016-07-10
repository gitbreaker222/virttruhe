/*
  APP.JS
 */
'use strict';

var app = {};
app.services = {};

window.onload = function(){
  riot.mount('info-bar');
  riot.mount('context-action-bar');
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

app.goTo = function (page) {
  if (app.currentPage) {
    app.currentPage.unmount(true);
  }
  app.currentPage = riot.mount(page)[0];
};

riot.route(function() {
  console.info("this page is not defined. Redirect to Inventory");
  riot.route('/inventory', 'Inventory');
});

riot.route('/', function(){
  riot.route('/inventory', 'Inventory');
});

riot.route('/inventory', function(){
  app.goTo('inventory');
});

riot.route('/scanner', function() {
  app.goTo('scanner');
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
riot.tag2('context-action-bar', '<button class="main-button" onclick="{mainButton.action}" name="{mainButton.name}"> <div> <img riot-src="{mainButton.img}"> </div> <label> {mainButton.label} </label> </button> <div class="secondary"> <button disabled> <img riot-src="{secondaryButtons[0].img}"> <label> {secondaryButtons[0].label} </label> </button> <button disabled> <img riot-src="{secondaryButtons[1].img}"> <label> {secondaryButtons[1].label} </label> </button> <button disabled> <img riot-src="{secondaryButtons[2].img}"> <label> {secondaryButtons[2].label} </label> </button> <button disabled> <img riot-src="{secondaryButtons[3].img}"> <label> {secondaryButtons[3].label} </label> </button> </div>', '', '', function (opts) {
  
  var mainAction = this.opts.main;
  
  var imagePath = './data/img/';
  var buttons = {
    scan: {
      name: 'scan',
      label: 'scan',
      action: 'riot.route("/scanner")',
      img: imagePath + 'qr-code.svg'
    },
    stopScan: {
      name: 'stopScan',
      label: 'stop scan',
      action: function stopScan() {
        
        riot.route('/inventory');
      },
      img: imagePath + 'cancel.svg'
    },
    info: {
      name: 'info',
      label: 'info',
      img: imagePath + 'info.svg'
    },
    use: {
      name: 'use',
      label: 'benutzen',
      img: imagePath + 'use.svg'
    },
    share: {
      name: 'share',
      label: 'share',
      img: imagePath + 'share.svg'
    },
    delete: {
      name: 'delete',
      label: 'löschen',
      img: imagePath + 'delete.svg'
    }
  };
  
  if (mainAction in buttons) {
    this.mainButton = buttons[mainAction];
  } else {
    throw new Error('the main button "' + mainAction + '" is not defined. Please use one of these: ' + Object.keys(buttons).toString())
    }
  
  this.secondaryButtons = [
    buttons.info,
    buttons.use,
    buttons.share,
    buttons.delete
  ];
  
  switch (window.location.hash) {
    case '#scanner':
      console.log('show actions for scanner');
      break;
    case '#inventory':
      console.log('show actions for inventory')
    }

});
riot.tag2('info-bar', '<header> <span name="infoText"> this is a header from riot.js </span> <span class="marbles"> <img src="data/img/marble-icon.png"> {this.marbles} </span> </header>', '', '', function (opts) {

      this.marbles = this.opts.marbles;

      this.updateLabel = function (){
        this.marbles = this.inputMarbles.value;
        this.inputMarbles.value = "";
      };
});
riot.tag2('inventory', '<ul class="items"> <li each="{items}" class="{selected:isSelected(this)}" onclick="{select}"> <img riot-src="{getImageSource(this)}"> </li> </ul> <context-action-bar main="scan"> </context-action-bar>', '', '', function (opts) {
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
      scope.selected = this.id;
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

riot.tag2('scanner', '<video id="cameraOutput" autoplay> </video> <hr> <input type="file" accept="image"> <img src="./data/img/10000000 - visit virttruhe.tumblr.com.png" id="img"> <context-action-bar main="stopScan"> </context-action-bar>', '', '', function (opts) {
    var scope = this,
        cameraStream,
        qr = new QCodeDecoder();
  
  scope.stopScan = function () {
    _stopScan(scope.cameraOutput)
    };
  
  var startScan = function () {
      scope.update();
      decodeFromVideo(scope.cameraOutput)
    };
  
  var _stopScan = function (video) {
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
  
  DetectRTC.load(function () {
    scope.update();
    startScan();
    });
  
  this.on('before-unmount', function () {
    this.stopScan();
  });
});