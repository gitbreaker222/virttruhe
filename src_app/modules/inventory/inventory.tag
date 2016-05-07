<inventory>
  <ul class="items">
    <li each={items}>
      <img src="{getImageSource(this)}"
           onclick={ select }>
    </li>
  </ul>


  <script>
    this.items = itemsData;

    this.getImageSource = function (item) {
      if (item.image) {
        return 'data/items/img/small/' + item.image;
      }

      return 'data/items/img/small/' + item.id + '.jpg';
    };

    this.select = function () {
      console.log("select " + this.name);
    }

  </script>
</inventory>