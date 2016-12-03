<app-dialogs-div>

  <app-dialog each="{dialog in dialogs}"
              message="{dialog.message}"
              primary-label="{dialog.primaryLabel}"
              primary-action="{dialog.primaryAction}"
              secondary-label="{dialog.secondaryLabel}"
              secondary-action="{dialog.secondaryAction}"
              type-class="{dialog.typeClass}"
              dialog-id="{dialog.id}">
  </app-dialog>

  <script>
    var tag = this;

    // TAG OPTIONS
    /*-------------------------------------*/
    var eventEmitter = window[tag.opts.eventEmitter] || window.appDialog;
    var eventName = tag.opts.eventName || 'showDialog';

    // TAG ATTRIBUTES
    /*-------------------------------------*/
    tag.dialogs = [];
    tag.counter = 0;

    // TAG METHODS
    /*-------------------------------------*/
    tag.show = function (dialog) {
      if (tag.dialogs.length > 20) {
        return window.console.error('too many dialogs')
      }
      dialog.id = tag.counter;
      tag.counter++;
      tag.dialogs.push(dialog);
      tag.update();
    };
    tag.close = function (id) {
      function outWhereTheIdIsIn (dialog) {
        return dialog.id !== id;
      }
      tag.dialogs = tag.dialogs.filter(outWhereTheIdIsIn);
      tag.update();
    };
    tag.clear = function () {
      tag.dialogs = [];
      tag.update();
    };
    tag.hasDialog = function () {
      return tag.dialogs.length > 0;
    };

    // EVENT LISTENERS
    /*-------------------------------------*/
    eventEmitter.on(eventName, tag.show);
    this.on('closeDialog', tag.close)
  </script>
</app-dialogs-div>



<app-dialog class="{type}">
  <div class="{backdrop: hasDialog()}"></div>

  <div class="content">
    <p>{message}</p>
    <button onclick="{action1}">
      {primaryLabel}
    </button>
    <button if="{showSecondButton()}"
            onclick="{action2}">
      {secondaryLabel}
    </button>
  </div>



  <script>
    var tag = this;

    tag.message = tag.opts.message || '…';
    tag.primaryLabel = tag.opts.primaryLabel  || 'ok';
    tag.primaryAction = tag.opts.primaryAction || null;
    tag.secondaryLabel = tag.opts.secondaryLabel  || 'cancel';
    tag.type = tag.opts.typeclass || '';

    var close = function () {
      tag.parent.trigger('closeDialog', tag.opts.dialogId);
    };

    tag.showSecondButton = function () {
      return !!tag.primaryAction;
    };
    tag.action1 = function () {
      if (tag.primaryAction) tag.primaryAction();
      close();
    };
    tag.action2 = function () {
      if (tag.primaryAction) tag.primaryAction();
      close();
    };

  </script>
</app-dialog>