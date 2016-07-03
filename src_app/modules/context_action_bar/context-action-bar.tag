<context-action-bar>
  <button class="main-button"
          onclick="{goTo}"
          name="{mainButton.name}">
    <div>
      <img src="{mainButton.img}">
    </div>
    <label>
      {mainButton.label}
    </label>
  </button>


  <button class="secondary">
    <img src="{secondaryButtons[0].img}">
    <label>
      {secondaryButtons[0].label}
    </label>
  </button>
  <button class="secondary">
    <img src="{secondaryButtons[1].img}">
    <label>
      {secondaryButtons[1].label}
    </label>
  </button>

  <div class="main-button-space"></div>

  <button class="secondary">
    <img src="{secondaryButtons[2].img}">
    <label>
      {secondaryButtons[2].label}
    </label>
  </button>
  <button class="secondary">
    <img src="{secondaryButtons[3].img}">
    <label>
      {secondaryButtons[3].label}
    </label>
  </button>


  <script>
    //data model
    var imagePath = './data/img/';
    var buttons = {
      scan: {
        name: 'scan',
        label: 'scan',
        img: imagePath + 'qr-code.svg'
      },
      stopScan: {
        name: 'stopScan',
        label: 'stop scan',
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

    this.mainButton = buttons.scan;
    this.secondaryButtons = [
      buttons.info,
      buttons.use,
      buttons.share,
      buttons.delete
    ];

    this.goTo = function (event) {
      var state = event.currentTarget.name;

      switch (state) {
        case 'scan':
          riot.route('/scanner');
      }
    };

    switch (window.location.hash) {
      case '#scanner':
        console.log('show actions for scanner');
        break;
      case '#inventory':
        console.log('show actions for inventory')
    }

  </script>
</context-action-bar>