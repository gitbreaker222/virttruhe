<vt-button-bar>
  <div each={this.opts.buttons}
       class="button"
       disabled="{this.disabled}"
       onclick="{triggerAction}">
    <i class="icon"></i>
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

