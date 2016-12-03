<app-inventory>
  <div if="{!hasItems()}"
       class="cover">
    <h2>
      Your inventory is empty.
    </h2>
    <p>
      Use the scanner on VIRTTRUHE artefacts to find items.
    </p>
    <button onclick="{scan}"
            class="center-block">
      <i class="icon scan"></i>
    </button>
    <p>
      <a href="{sampleQrCodes}"
         type=""
         download>
        Get example VIRTTRUHE qr-codes here.
      </a>
    </p>
  </div>

  <ul class="items">
    <li each={items()}
        class={selected:isSelected(this)}
        onclick={select}>
      <img src={getItemImageSrc(this)}>
    </li>
  </ul>

  <vt-button-bar
      class="context-actions"
      buttons={data.buttonList}>
  </vt-button-bar>


  <script>
    var tag = this;

    var itemsService = app.services.items;
    var dialogService = app.services.dialog;
    var inventory = app.inventory;

    // private functions
    var update = function () {
      tag.update();
      tag.updateButtonStates();
    };

    tag.sampleQrCodes = app.constants.sampleQrCodes;

    // public functions
    tag.items = inventory.getItems;

    tag.hasItems = function () {
      return tag.items().length > 0;
    };

    tag.data = {
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

    tag.getItemImageSrc = function (item) {
      var itemName;
      if (item.imageName && typeof(item.imageName) === 'string') {
        itemName = item.imageName;
      } else if (item.id && typeof(item.id) === 'string') {
        itemName = item.id + '.jpg';
      } else {
        throw new Error('Exception for itemName')
      }
      return app.constants.itemImageSmallPath + itemName;
    };

    tag.isSelected = function (item) {
      return item.id === inventory.getSelected();
    };

    tag.select = function (event) {
      var item = event.item;
      if (item.id === inventory.getSelected()) {
        return tag.resetSelection();
      }
      inventory.select(item.id);
    };

    tag.resetSelection = function () {
      inventory.select(null);
    };

    tag.updateButtonStates = function () {
      var selected = inventory.getSelected();
      tag.data.buttonList.forEach(function (button) {
        switch (button.label) {
          case 'scan':
            button.disabled = false;
            break;
          case 'use':
            button.disabled = !itemsService.itemHasAction(selected);
            break;
          default:
            button.disabled = !selected;
        }
      })
    };

    tag.info = function (itemId) {
      dialogService.show({
        message: inventory.getItemDescription(itemId)
      });
    };

    tag.use = function (itemId) {
      var item = itemsService.getItem(itemId);
      var message = '(Preview) Use ' + item.name + '?\n' + item.action;
      var callback = function () {
        inventory.trigger('use', itemId);
      };
      dialogService.show({
        message: message,
        primaryAction: callback
      });
    };

    tag.share = function (itemId) {
      var item = itemsService.getItem(itemId);
      dialogService.show({
        message: '(preview) show QR Code for '+ item.name +'.'
      });
    };

    tag.remove = function (itemId) {
      var item = itemsService.getItem(itemId);
      var message = 'Deleted "' + item.name;
      var reAddItem = function () {
        inventory.addItem(itemId);
      };
      inventory.deleteItem(itemId);

      dialogService.show({
        message: message,
        primaryLabel: 'undo',
        primaryAction: reAddItem
      });
    };

    tag.scan = function () {
      riot.route('scanner')
    };


    // Listen to own events
    tag.on('show', update);
    tag.on('scan', tag.scan);
    tag.on('info use share remove', function (type) {
      tag[type](inventory.getSelected());
    });

    // Listen to external events
    inventory.on('change', update);

    tag.updateButtonStates();
  </script>
</app-inventory>
