<inventory>
  <ul class="items">
    <li each={items}
        class={selected:isSelected(this)}
        onclick={select}>
      <img src={getImageSource(this)}>
    </li>
  </ul>

  <context-action-bar actions={['scan','info','use','share','remove']}>
  </context-action-bar>


  <script>
    this.items = app.getItems();
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

  </script>
</inventory>