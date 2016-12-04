<app-info-bar>
  <header>
    <span name="infoText">
      current layer: {getLayer()}
    </span>
    <span name="selectedItem"
          if="{selectedItem()}">
      {selectedItem(true).name}
    </span>

    <span class="marbles">
      <img src="data/img/marble-icon.png">
      { this.marbles }
    </span>
  </header>



    <script>
      var tag = this;

      tag.marbles = tag.opts.marbles;

      tag.getLayer = app.services.virttruhe.getCurrentLayer;

      tag.selectedItem = function (getObject) {
        return app.inventory.getSelected(getObject);
      };

      tag.updateLabel = function (){
        tag.marbles = tag.inputMarbles.value;
        tag.inputMarbles.value = "";
      };
    </script>
</app-info-bar>