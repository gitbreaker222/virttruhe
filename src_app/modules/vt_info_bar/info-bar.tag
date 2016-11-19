<info-bar>
  <header>
    <span name="infoText">
      this is a header from riot.js
    </span>

    <span class="marbles">
      <img src="data/img/marble-icon.png">
      { this.marbles }
    </span>
  </header>



    <script>
      // tag properties have data binding, so transfer the  attribute to it
      this.marbles = this.opts.marbles;

      this.updateLabel = function (){
        this.marbles = this.inputMarbles.value;
        this.inputMarbles.value = "";
      };
    </script>
</info-bar>