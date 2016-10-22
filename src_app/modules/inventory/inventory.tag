<inventory>
  <ul class="items">
    <li each={items}
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
    var self = this;

    var init = function () {
      setButtonStates();
    };

    var setButtonStates = function () {
      self.data.buttonList.forEach(function(button){
        switch (button.label) {
          case 'scan':
            button.disabled = false;
            break;
          default: button.disabled = !!self.selected;
        }
      })
    };

    this.items = app.services.items.getItems();
    this.selected = null;
    this.data = {
      buttonList: [
      {
        label: 'scan',
        icon: 'qr-code',
        action: 'scan',
        disabled: false
      },
      {
        label: 'info',
        icon: 'info',
        action: 'info',
        disabled: false
      },
      {
        label: 'use',
        icon: 'use',
        action: 'use',
        disabled: false
      },
      {
        label: 'share',
        icon: 'share',
        action: 'share',
        disabled: false
      },
      {
        label: 'delete',
        icon: 'delete',
        action: 'delete',
        disabled: false
      }
    ]
    };

    this.isSelected = function (item) {
      return item.id === this.selected;
    }.bind(this);

    this.getImageSource = function (item) {
      if (item.image) {
        return 'data/items/img/small/' + item.image;
      }
      return 'data/items/img/small/' + item.id + '.jpg';
    }.bind(this);

    this.select = function (event) {
      if (this.selected === event.item.id) {
        this.selected = null;
      } else {
        this.selected = event.item.id;
      }
      setButtonStates();
    }.bind(this);

    this.remove = function (itemId) {
      var itemIndex = this.items.indexOf({id: itemId});
      console.log(itemIndex)
    }.bind(this);

    this.on('scan', function(){
      riot.route('scanner')
    });
    this.on('info use share delete', function(type){
      console.log('pushed', type, 'button')
    });

    init();

  </script>
</inventory>