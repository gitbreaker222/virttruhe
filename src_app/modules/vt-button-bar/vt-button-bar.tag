<vt-button-bar>
  <div each={this.opts.buttons}
       class="button"
       disabled="{this.disabled}"
       onclick="{triggerAction}">
    <img src="../data/img/{this.icon}.svg" class="icon"></img>
    <label>
      {this.label}
    </label>
  </div>


  <script>
    this.triggerAction = function (event) {
      var action = event.item.action;
      this.parent.trigger(action);
    }.bind(this)
  </script>
</vt-button-bar>

