<inventory>
  <ul class="items">
    <li each={data.items}
        class={selected:isSelected(this)}
        onclick={select}>
      <img src={getImageSource(this)}>
    </li>
  </ul>

  <vt-button-bar
      class="context-actions"
      buttons={data.buttonList}>
  </vt-button-bar>

  <script>
    var itemsService = app.services.items;
    var self = this;

    this.data = {
      items: [],
      selected: null,
      buttonList: [
      {
        label: 'scan',
        icon: 'qr-code',
        action: 'scan',
        disabled: null
      },
      {
        label: 'info',
        icon: 'info',
        action: 'info',
        disabled: null
      },
      {
        label: 'use',
        icon: 'use',
        action: 'use',
        disabled: null
      },
      {
        label: 'share',
        icon: 'share',
        action: 'share',
        disabled: null
      },
      {
        label: 'delete',
        icon: 'delete',
        action: 'remove',
        disabled: null
      }
    ]
    };

    var init = function () {
      setButtonStates();
      loadItems();
    };

    var setButtonStates = function () {
      self.data.buttonList.forEach(function(button){
        switch (button.label) {
          case 'scan':
            button.disabled = false;
            break;
          default:
            button.disabled = !self.data.selected;
        }
      })
    };

    var loadItems = function () {
      this.data.items = itemsService.getAllItems();
    }.bind(this);

    var getItem = function (itemId) {
      return itemsService.getItem(itemId);
    };

    var showDialog = function (message, type) {
      //validation
      if (!message || message === '') {
        throw new Error('please provide a message string. Got: '+ message);
      }

      switch (type) {
        case 'confirm':
          return confirm(message);
          break;
        default: alert(message)
      }
    };

    this.isSelected = function (item) {
      return item.id === this.data.selected;
    }.bind(this);

    this.getImageSource = function (item) {
      if (item.image) {
        return 'data/items/img/small/' + item.image;
      }
      return 'data/items/img/small/' + item.id + '.jpg';
    }.bind(this);

    this.select = function (event) {
      if (this.data.selected === event.item.id) {
        this.data.selected = null;
      } else {
        this.data.selected = event.item.id;
      }
      setButtonStates();
    }.bind(this);

    this.info = function (itemId) {
      console.log('info', itemId);
    };
    this.use = function (itemId) {
      console.log('use', itemId);
    };
    this.share = function (itemId) {
      console.log('share', itemId);
    };
    this.remove = function (itemId) {
      var item = itemsService.getItem(itemId);
      var message = 'Delete '+ item.name +'?';
      var choice = showDialog(message, 'confirm');
      if (!choice) {
        return;
      }
      this.data.items = this.data.items.filter(function (item) {
        return item.id !== itemId;
      });
      this.update();
    }.bind(this);

    this.on('scan', function(){
      riot.route('scanner')
    });
    this.on('info use share remove', function(type){
      this[type](this.data.selected);
    });

    init();

  </script>
</inventory>