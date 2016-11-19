<vt-button-bar>
  <div each={buttons}
       class="{
          button: true,
          disabled: this.disabled
       }"
       onclick="{triggerAction}">
    <div>
      <img if={this.icon}
           src="{imagePathFor(this.icon)}"
           class="icon">
      <label disabled="{this.disabled}">
        {this.label}
      </label>
    </div>
  </div>


  <script>
    var tag = this;

    /* possible attributes

    buttons: array of objects (max 5)
      label:     string,
      icon:      string,
      action:    string  (optional),
      disabled:  boolean (default: false)

    */

    var normalizeButtons = function () {
      var buttons = tag.opts.buttons;
      var buttonsAmount = buttons.length;
      var maxAmount = 5;
      if (buttonsAmount > maxAmount) {
        var message = 'too many buttons: '+buttonsAmount;
        window.console.error(message);
        buttons = buttons.slice(0,4);
      } else if (buttonsAmount < maxAmount) {
        var delta = maxAmount - buttonsAmount;
        while (delta > 0) {
          delta--;
          var placeholder = {
            label:     '',
            icon:      null,
            action:    null,
            disabled:  false
          };
          buttons.push(placeholder);
        }
      }
      return buttons;
    };

    /***/

    tag.buttons = normalizeButtons();

    /***/

    tag.imagePathFor = function (imageName) {
        return '../data/img/'+imageName+'.svg';
    };
    tag.triggerAction = function (event) {
      if (event.item.disabled) {
        event.stopPropagation();
        return;
      }
      tag.parent.trigger(event.item.action);
    };
  </script>
</vt-button-bar>

