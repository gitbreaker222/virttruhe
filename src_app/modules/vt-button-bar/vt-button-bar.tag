<vt-button-bar>
  <div each={this.opts.buttons}
       class="{button:true, disabled:this.disabled}"
       onclick="{triggerAction}">
    <div>
      <img src="../data/img/{this.icon}.svg" class="icon"></img>
      <label disabled="{this.disabled}">
        {this.label}
      </label>
    </div>
  </div>


  <script>
    this.triggerAction = function (event) {
      if (event.item.disabled) {
        event.stopPropagation();
        return;
      }
      this.parent.trigger(event.item.action);
    }.bind(this)
  </script>
</vt-button-bar>

