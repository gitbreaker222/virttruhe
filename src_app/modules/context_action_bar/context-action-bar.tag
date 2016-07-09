<context-action-bar>
  <button class="main-button"
          onclick="{mainButton.action}"
          name="{mainButton.name}">
    <div>
      <img src="{mainButton.img}">
    </div>
    <label>
      {mainButton.label}
    </label>
  </button>

  <div class="secondary">
    <button>
      <img src="{secondaryButtons[0].img}">
      <label>
        {secondaryButtons[0].label}
      </label>
    </button>
    <button>
      <img src="{secondaryButtons[1].img}">
      <label>
        {secondaryButtons[1].label}
      </label>
    </button>
    <button>
      <img src="{secondaryButtons[2].img}">
      <label>
        {secondaryButtons[2].label}
      </label>
    </button>
    <button>
      <img src="{secondaryButtons[3].img}">
      <label>
        {secondaryButtons[3].label}
      </label>
    </button>
  </div>



  <script>
    //tag attributes
    var mainAction = this.opts.main;

    //data model
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
          //qr.stop();
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

    //data model end----

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

  </script>
</context-action-bar>