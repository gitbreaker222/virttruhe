<app-template>


  <script>
    var tag = this;

    // API
    var apiTypes = {
      text: 'string'
    };

    app.services.utility.validate(tag.opts, apiTypes);

    // PRIVATE VARS / FUNCTIONS
    /*-------------------------------------*/
    var toggleView = function (eventName, pageName) {
      switch (eventName){
        case 'show':
          break;
        case 'hide':
          break;
      }
    };

    // TAG ATTRIBUTES
    /*-------------------------------------*/


    // TAG METHODS
    /*-------------------------------------*/


    // EVENT LISTENERS
    /*-------------------------------------*/
    app.state.on('show hide', toggleView)

  </script>
</app-template>