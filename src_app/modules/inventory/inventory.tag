<inventory>
  <ul class="items">
    <li each={items}
        class={selected:isSelected(this)}
        onclick={select}>
      <img src={getImageSource(this)}>
    </li>
  </ul>


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
      console.log('previous selected: ', scope.selected);
      scope.selected = this.id;
      console.log('new selected: ', scope.selected);
    }

  </script>
</inventory>