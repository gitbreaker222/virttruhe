<inventory>
  <ul class="items">
    <li each={items}
        class={selected:isSelected(this)}
        onclick={select}>
      <img src={getImageSource(this)}>
    </li>
  </ul>

  <!--<context-action-bar actions={['scan','info','use','share','remove']}>
  </context-action-bar>-->

  <div class="context-actions">
    <button class="button-primary">
      <div class="icon">

      </div>
      <label>
        scan
      </label>
    </button>
    <button disabled>
      <div class="icon">

      </div>
      <label>
        111111
      </label>
    </button>
    <button>
      <div class="icon">

      </div>
      <label>
        22222
      </label>
    </button>
    <button>
      <div class="icon">

      </div>
      <label>
        333
      </label>
    </button>
    <button>
      <div class="icon">

      </div>
      <label>
        444444
      </label>
    </button>
  </div>

  <script>
    this.items = app.services.items.getItems();
    this.selected = null;

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
      this.selected = event.item.id;
    }.bind(this);

    this.remove = function (itemId) {
      var itemIndex = this.items.indexOf({id: itemId});
      console.log(itemIndex)
    }.bind(this);

  </script>
</inventory>