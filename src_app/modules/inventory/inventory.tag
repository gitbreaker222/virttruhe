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
    var dialogService = app.services.dialog;

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
          case 'use':
            var item = itemsService.getItem(self.data.selected);
            button.disabled = !(item && item.action);
            break;
          default:
            button.disabled = !self.data.selected;
        }
      })
    };

    var loadItems = function () {
      this.data.items = itemsService.getAllItems();
    }.bind(this);

    var removeItemFromList = function (itemId, list) {
      return list.filter(function (item) {
        return item.id !== itemId;
      });
    };

    var getItem = function (itemId) {
      return itemsService.getItem(itemId);
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
      if (!event || this.data.selected === event.item.id) {
        this.data.selected = null;
      } else {
        this.data.selected = event.item.id;
      }
      setButtonStates();
    }.bind(this);

    this.resetSelection = function () {
      this.select(null);
    }.bind(this);

    this.info = function (itemId) {
      var item = itemsService.getItem(itemId);
      var message = item.name + ':\n' + item.description;
      dialogService.newDialog(message);
    };
    this.use = function (itemId) {
      var item = itemsService.getItem(itemId);
      var message = 'Use ' + item.name + '?\n' + item.action;
      dialogService.newDialog(message);
    };
    this.share = function (itemId) {
      message = 'To Do - show QR-Code for:\n'+ itemId;
      dialogService.newDialog(message)
    };
    this.remove = function (itemId) {
      var item = itemsService.getItem(itemId);
      var message = 'Delete '+ item.name +'?';
      var choice = dialogService.newDialog(message, 'confirm');
      if (!choice) {
        return;
      }
      this.data.items = removeItemFromList(itemId, this.data.items);
      this.select('');
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