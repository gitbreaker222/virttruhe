<inventory>
  <ul class="items">
    <li each={items}
        class={selected:isSelected(this)}
        onclick={select}>
      <img src={getImageSource(this)}>
    </li>
  </ul>

  <context-action-bar main="scan">
  </context-action-bar>


  <script>
    var scope = this;

    scope.items = app.getItems();
    scope.selected = null;

    scope.isSelected = function(item){
      return item.id === scope.selected;
    };

    scope.getImageSource = function (item) {
      if (item.image) {
        return 'data/items/img/small/' + item.image;
      }
      return 'data/items/img/small/' + item.id + '.jpg';
    };

    scope.select = function () {
      scope.selected = this.id;
    }

  </script>
</inventory>