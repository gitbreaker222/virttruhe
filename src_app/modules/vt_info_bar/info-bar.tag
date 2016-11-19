<app-info-bar>
  <header>
    <span name="infoText">
      current layer: {getLayer()}
    </span>

    <span class="marbles">
      <img src="data/img/marble-icon.png">
      { this.marbles }
    </span>
  </header>



    <script>
      var tag = this;
      // tag properties have data binding, so transfer the  attribute to it
      tag.marbles = tag.opts.marbles;

      tag.getLayer = app.services.virttruhe.getCurrentLayer;

      tag.updateLabel = function (){
        tag.marbles = tag.inputMarbles.value;
        tag.inputMarbles.value = "";
      };
    </script>
</app-info-bar>