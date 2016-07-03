<context-action-bar>
  <button class="main-button"
          onclick="{goTo}"
          name="scan">
    <div>
      <img src="./data/img/qr-code.svg">
    </div>
    <label>
      scan
    </label>
  </button>


  <button class="secondary">
    <img src="./data/img/info.svg">
    <label>
      info
    </label>
  </button>
  <button class="secondary">
    <img src="./data/img/use.svg">
    <label>
      use
    </label>
  </button>
  <div class="main-button-space"></div>
  <button class="secondary">
    <img src="./data/img/share.svg">
    <label>
      share
    </label>
  </button>
  <button class="secondary">
    <img src="./data/img/delete.svg">
    <label>
      delete
    </label>
  </button>


  <script>
    this.goTo = function (event) {
      var state = event.currentTarget.name;

      switch (state){
        case 'scan':
          riot.route('/scanner');
      }
    }

  </script>
</context-action-bar>