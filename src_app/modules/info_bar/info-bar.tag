<info-bar>
  <header>
    this is a header from riot.js

    <input  type="text"
            placeholder="update marbles value"
            name="inputMarbles"
            onchange="{ updateLabel }">

    <a href="#/scanner">scanner</a>
    <a href="#/inventory">inventory</a>

    <span class="marbles">marbles: { this.marbles }</span>
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