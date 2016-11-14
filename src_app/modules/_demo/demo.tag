<vt-demo>
    <div if={demoMethod()}>
        <input type="button"
               onclick={clickFn}>

        <span each={demoProp2.length}
              class={focus: true, item: demoMethod(this)}
        >
            {demoProp2}
        </span>
    </div>


    <script>
        var tag = this;

        // private properties
        var demoProp1;

        // public properties
        tag.demoProp2 = 'You are a nice person.';

        // private methods
        var showFn = function () {
            demoProp1 = true;
        };

        var hideFn = function () {
            demoProp1 = false;
        };


        // public methods
        tag.demoMethod = function (argument) {
            return demoProp1;
        };

        tag.clickFn = function (event) {

        };


        // listen to own events
        tag.on('show', showFn);
        tag.on('hide', hideFn);

        // listen to external events
        app.demo.on('event', demo);
    </script>
</vt-demo>