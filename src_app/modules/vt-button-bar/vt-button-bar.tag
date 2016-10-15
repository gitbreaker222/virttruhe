<vt-button-bar>
  <button each={this.opts.buttons}
          disabled="{this.disabled}"
          onclick="{triggerAction}">
    <div class="icon"></div>
    <label>
      {this.label}
    </label>
  </button>


  <script>
    this.triggerAction = function (event) {
      var action = event.item.action;
      this.parent.trigger(action);
    }.bind(this)
  </script>
</vt-button-bar>

