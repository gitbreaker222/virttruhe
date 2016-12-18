<app-dialogs>

  <div each={dialog, i in dialogs}
       class="dialog {dialog.styleType}">
    <div class="backdrop"
         data-index="{i}"
         onclick="{backgroundAction}"></div>
    <div class="content"
         data-index="{i}"
         onmouseover="{stopTimeout}">
      <yield/>

      <p>{dialog.message}</p>
      <span>
        <button data-index="{i}"
                onclick="{action1}">
          {dialog.primaryLabel || 'ok'}
        </button>
        <button if="{isSecondButtonDefined(i)}"
                data-index="{i}"
                onclick="{action2}">
          {dialog.secondaryLabel || 'MISSING "secondaryLabel"'}
        </button>
      </span>
    </div>
  </div>

  <script>
    var tag = this;
    var eventEmitter = tag.opts.eventEmitter || app;
    var eventName = tag.opts.eventName || 'showDialog';
    var timerID;
    tag.dialogs = [];

    tag.show = function (data) {
      data = data || {};
      if (data.timeout) {
        data.timerId = setTimeout(tag.close, data.timeout, tag.dialogs.length - 1);
      }
      tag.dialogs.push(data);
      tag.update();
    };
    tag.close = function (i) {
      tag.dialogs.splice(i, 1);
      tag.update();
    };
    tag.isSecondButtonDefined = function (i) {
      return !!tag.dialogs[i].secondaryLabel
        || !!tag.dialogs[i].secondaryAction;
    };
    tag.stopTimeout = function (event) {
      var i = event.target.dataset.index;
      var dialog = tag.dialogs[i];
      if (dialog.timerId) {
        clearTimeout(dialog.timerId);
        tag.dialogs[i].timerId = null;
      }
    };
    tag.action1 = function (event) {
      var i = event.target.dataset.index;
      if (tag.dialogs[i].primaryAction) tag.dialogs[i].primaryAction();
      tag.close(i);
    };
    tag.action2 = function (event) {
      var i = event.target.dataset.index;
      if (tag.dialogs[i].secondaryAction) tag.dialogs[i].secondaryAction();
      tag.close(i);
    };
    tag.backgroundAction = function (event) {
      var i = event.target.dataset.index;
      if (tag.isSecondButtonDefined(i)) {
        tag.action2(event);
      } else {
        tag.action1(event);
      }
    };

    eventEmitter.on(eventName, tag.show);
  </script>
</app-dialogs>