<app-dialogs-div>

  <app-dialog each="{dialog in dialogs}"
              message="{dialog.message}"
              ok-label="{dialog.okLabel}"
              ok-action="{dialog.okAction}"
              cancel-label="{dialog.cancelLabel}"
              cancel-action="{dialog.cancelAction}"
              type-class="{dialog.typeClass}"
              dialog-id="{dialog.id}">
  </app-dialog>

  <script>
    var tag = this;

    // GIVEN ARGUMENTS/OPTS
    /*-------------------------------------*/
    var eventEmitter = window[tag.opts.eventemitter] || app;
    var eventName = tag.opts.eventname;

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

    // EVENT LISTENERS
    /*-------------------------------------*/
    eventEmitter.on(eventName, tag.show);
    this.on('closeDialog', tag.close)
  </script>
</app-dialogs-div>



<app-dialog class="{type}">

  <p>{message}</p>
  <button onclick="{action1}">
    {okLabel}
  </button>
  <button if="{showSecondButton()}"
          onclick="{action2}">
    {cancelLabel}
  </button>


  <script>
    var tag = this;

    tag.message = tag.opts.message || '…';
    tag.okLabel = tag.opts.oklabel  || 'ok';
    tag.okAction = tag.opts.okaction || null;
    tag.cancelLabel = tag.opts.cancellabel  || 'cancel';
    tag.type = tag.opts.typeclass || '';

    var close = function () {
      tag.parent.trigger('closeDialog', tag.opts.dialogId);
    };

    tag.showSecondButton = function () {
      return !!tag.okAction;
    };
    tag.action1 = function (event) {
      if (tag.okAction) tag.okAction();
      close();
    };
    tag.action2 = function (event) {
      //tag.opts.buttonAction2;
      close();
    };

  </script>
</app-dialog>