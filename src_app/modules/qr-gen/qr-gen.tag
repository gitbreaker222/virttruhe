<app-qr-gen>
  <div id="qrcontainer"
       if="{hasText()}">
  </div>


  <script>
    var tag = this;

    tag.qrcode = new QRCode(tag.qrcontainer);

    tag.hasText = function () {
      return !!tag.opts.text;
    };

    tag.makeCode = function () {
      if(!tag.hasText()) return;
      tag.qrcode.makeCode(tag.opts.text)
    };

    tag.on('update', tag.makeCode);
  </script>
</app-qr-gen>