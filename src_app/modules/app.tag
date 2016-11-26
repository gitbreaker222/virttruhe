<app>
  <app-info-bar marbles="7"></app-info-bar>

  <app-intro class="page {show: isVisible('intro')}"></app-intro>

  <app-inventory class="page {show: isVisible('inventory')}"></app-inventory>

  <app-scanner class="page {show: isVisible('scanner')}"></app-scanner>

  <app-dialogs-container
      eventemitter="app"
      eventname="showDialog">
  </app-dialogs-container>

  <script>
    var tag = this;

    tag.isVisible = function (pageName) {
      var currentPageName = app.state.getCurrentPageName();
      return pageName === currentPageName;
    };

    app.on('showPage', tag.update)
  </script>
</app>