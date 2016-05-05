riot.tag2('info-bar', '<header> this is a header from riot.js <input type="text" placeholder="hello" name="inputHearts" onchange="{updateLabel}"> <span class="hearts">hearts: {this.hearts}</span> </header>', '', '', function(opts) {

        this.hearts = this.opts.hearts;

        this.updateLabel = function (){
            this.hearts = this.inputHearts.value;
            this.inputHearts.value = "";
        }
});