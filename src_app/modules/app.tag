<app>
  <app-info-bar marbles="7"></app-info-bar>

  <app-intro class="page {show: isVisible('intro')}"></app-intro>

  <app-inventory class="page {show: isVisible('inventory')}"></app-inventory>

  <app-scanner class="page {show: isVisible('scanner')}"></app-scanner>

  <app-dialogs-div event-emitter="app"></app-dialogs-div>

  <script>
    var tag = this;

    function showPage (page) {
      if (!page) return;
      tag.tags['app-'+page].trigger('show');
      tag.update();
    }

    tag.isVisible = function (pageName) {
      var currentPageName = app.state.getCurrentPageName();
      return pageName === currentPageName;
    };

    app.on('showPage', showPage);
  </script>
</app>