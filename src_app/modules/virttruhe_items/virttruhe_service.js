app.services.virttruhe = {
  currentLayer: '',
  map: {
    default: {
      '#00000000': 'pine_(closed)',
      '#00000001': 'pine_(open)',
      '#00000002': 'pine_seed',
      '#00000003': 'pot',
      '#00000004': 'pot1',
      '#00000005': 'flower01',
      '#00000006': 'flower02',
      '#00000007': 'flower03',
      '#00000008': 'beer',
      '#00000009': 'wine',
      '#0000000a': 'intro',
      '#0000000b': 'note01',
      '#0000000c': 'note02',
      '#0000000d': 'fingerp_scanner',
      '#0000000e': 'pills',
      '#0000000f': 'fingerprint01',
      '#a0000000': 'museum',
      '#a0000001': 'music'
    }
  },
  layerExists: function (layer) {
    if (!this.map[layer]) {
      var txt = 'invalid layer name: ' + layer;
      app.services.dialog.newDialog(txt, 'error');
      return false;
    }
    return true;
  },
  getCurrentLayer: function () {
    return this.currentLayer || 'default';
  },
  setCurrentLayer: function (layer) {
    //validation
    if (!this.layerExists(layer)) {
      throw new Error('layer does not exist: '+layer);
    }
    
    this.currentLayer = layer;
    return this.currentLayer;
  },
  getLayerMap: function (layer) {
    //validation
    layer = layer || 'default';
    if (!this.layerExists(layer)) {
      return null;
    }
    
    return this.map[layer];
  },
  open: function (virttruheKey, layer) {
    //validation
    if (!layer || !this.layerExists(layer)) {
      window.console.info('Falling back to current layer');
      layer = this.getCurrentLayer();
    }
    var layerMap = this.getLayerMap(layer);
    if (!layerMap[virttruheKey]) {
      var txt = 'the virttruhe "'+virttruheKey+'" does not exist on layer "'+layer+'"';
      app.services.dialog.newDialog(txt, 'error');
      return null;
    }
    
    var itemId = layerMap[virttruheKey];
    return app.services.items.getItem(itemId);
  }
};
