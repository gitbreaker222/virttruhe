<app-template>


  <script>
    var tag = this;


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