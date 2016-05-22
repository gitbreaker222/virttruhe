<info-bar>
  <header>
    this is a header from riot.js

    <input  type="text"
            placeholder="hello"
            name="inputHearts"
            onchange="{ updateLabel }">

    <a href="#scanner">scanner</a>

    <span class="hearts">hearts: { this.hearts }</span>
  </header>



    <script>
      // tag properties have data binding, so transfer the  attribute to it
      this.hearts = this.opts.hearts;

      this.updateLabel = function (){
        this.hearts = this.inputHearts.value;
        this.inputHearts.value = "";
      };
    </script>
</info-bar>