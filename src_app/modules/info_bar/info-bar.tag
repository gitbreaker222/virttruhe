<info-bar>
    <header>
        this is a header from riot.js
        <span class="hearts">hearts: { this.hearts }</span>
    </header>

    <form onsubmit="{ updateLabel }">
        <input type="text"
               name="inputHearts"
               placeholder="set hearts value">
        <input type="submit" hidden>
    </form>


    <script>
        // tag properties have data binding, so transfer the  attribute to it
        this.hearts = this.opts.hearts;

        this.updateLabel = function (){
            this.hearts = this.inputHearts.value;
        }
    </script>
</info-bar>