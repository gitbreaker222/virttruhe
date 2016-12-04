<app-qr-gen>
  <div id="qrcontainer"
       if="{hasText()}">
  </div>


  <script>
    var tag = this;

    // API
    var apiTypes = {
      text: 'string'
    };

    app.services.utility.validate(tag.opts, apiTypes);

    tag.qrcode = new QRCode(tag.qrcontainer);

    tag.hasText = function () {
      return !!tag.opts.text;
    };

    tag.makeCode = function () {
      tag.qrcode.makeCode(tag.opts.text)
    };

    tag.on('update', tag.makeCode);
  </script>
</app-qr-gen>