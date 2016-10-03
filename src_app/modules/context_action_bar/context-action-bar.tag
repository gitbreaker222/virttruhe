<context-action-bar>
  <button class="main-button"
          onclick={mainButton.action}
          name={mainButton.name}>
    <div>
      <img src={mainButton.img}>
    </div>
    <label>
      {mainButton.label}
    </label>
  </button>

  <div class="secondary">
    <button disabled>
      <img src={secondaryButtons[0].img}>
      <label>
        {secondaryButtons[0].label}
      </label>
    </button>
    <button disabled>
      <img src={secondaryButtons[1].img}>
      <label>
        {secondaryButtons[1].label}
      </label>
    </button>
    <button disabled>
      <img src={secondaryButtons[2].img}>
      <label>
        {secondaryButtons[2].label}
      </label>
    </button>
    <button disabled>
      <img src={secondaryButtons[3].img}>
      <label>
        {secondaryButtons[3].label}
      </label>
    </button>
  </div>



  <script>
    /*
     the context-action-bar takes an array of button names
     - actions: array with max. 5 elements. First is main action
     */
    var mainAction = this.opts.actions[0];
    var secondaryActions = this.opts.actions.slice(1, 5);

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
        action: function () {
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
      remove: {
        name: 'remove',
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

    this.secondaryButtons = [];
    this.secondaryButtons.push(buttons[secondaryActions[0]]);
    this.secondaryButtons.push(buttons[secondaryActions[1]]);
    this.secondaryButtons.push(buttons[secondaryActions[2]]);
    this.secondaryButtons.push(buttons[secondaryActions[3]]);

    switch (window.location.hash) {
      case '#scanner':
        console.log('show actions for scanner');
        break;
      case '#inventory':
        console.log('show actions for inventory')
    }

  </script>
</context-action-bar>