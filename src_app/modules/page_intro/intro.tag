<vt-intro-page>
  <div>
    scan the start card
  </div>

  <vt-button-bar buttons={buttonList}>
  </vt-button-bar>

  <script>
    var tag = this;

    // private properties


    // public properties
    tag.buttonList = [
      {
        label: 'scan',
        icon: 'qr-code',
        action: 'scan',
        disabled: false
      }
    ];

    // private methods
    var showFn = function () {

    };

    var hideFn = function () {

    };


    // public methods


    // listen to own events
    tag.on('show', showFn);
    tag.on('hide', hideFn);

    // listen to external events


  </script>
</vt-intro-page>