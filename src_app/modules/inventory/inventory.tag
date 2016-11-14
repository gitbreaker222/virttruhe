<inventory>
  <ul class="items">
    <li each={items()}
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
    var tag = this;

    var itemsService = app.services.items;
    var dialogService = app.services.dialog;
    var inventory = app.inventory;

    var update = function () {
      tag.update();
    };

    tag.items = inventory.getItems;

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

    tag.getImageSource = function (item) {
      if (item.imageName) {
        return 'data/items/img/small/' + item.imageName;
      }
      return 'data/items/img/small/' + item.id + '.jpg';
    };

    tag.isSelected = function (item) {
      return item.id === inventory.getSelected();
    };

    tag.select = function (event) {
      var item = event.item;
      if (item.id === inventory.getSelected()) {
        return tag.resetSelection();
      }
      inventory.trigger('select', item.id);
      tag.updateButtonStates();
    };

    tag.resetSelection = function () {
      inventory.trigger('select');
      tag.updateButtonStates();
    };

    tag.updateButtonStates = function () {
      var selected = inventory.getSelected();
      tag.data.buttonList.forEach(function(button){
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
      var message = inventory.getItemDescription(itemId);
      dialogService.newDialog(message);
    };

    tag.use = function (itemId) {
      var item = itemsService.getItem(itemId);
      var message = '(Preview) Use ' + item.name + '?\n' + item.action;
      var callback = function (choice) {
        if (choice) {
          inventory.trigger('use', itemId);
        }
      };
      dialogService.newDialog(message, 'confirm', callback);
    };

    tag.share = function (itemId) {
        var message = '(preview) show QR Code for this item.';
        dialogService.newDialog(message);
    };

    tag.remove = function (itemId) {
      var item = itemsService.getItem(itemId);
      var message = 'Deleted "'+item.name+'" from the inventory. Undo?';
      var reAddItem = function (choice) {
        if (choice) {
          inventory.addItem(itemId);
        }
      };
      inventory.deleteItem(itemId);
      dialogService.newDialog(message, 'confirm', reAddItem)
    };

    // Listen to own events
    tag.on('show', update);
    tag.on('scan', function(){
      riot.route('scanner')
    });
    tag.on('info use share remove', function(type){
      tag[type](inventory.getSelected());
    });

    // Listen to external events
    inventory.on('addItem deleteItem', update);

    tag.updateButtonStates();

    /*
    share(itemId) {
      message = 'To Do - show QR-Code for:\n'+ itemId;
      dialogService.newDialog(message)
    };
    */
  </script>
</inventory>
