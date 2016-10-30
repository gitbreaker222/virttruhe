app.services.virttruhe = {
  map: {
    default: {
      '00000000': 'pine_(closed)',
      '00000001': 'pine_(open)',
      '00000002': 'pine_seed',
      '00000003': 'pot',
      '00000004': 'pot1',
      '00000005': 'flower01',
      '00000006': 'flower02',
      '00000007': 'flower03',
      '00000008': 'beer',
      '00000009': 'wine',
      '0000000a': 'intro',
      '0000000b': 'note01',
      '0000000c': 'note02',
      '0000000d': 'fingerp_scanner',
      '0000000e': 'pills',
      '0000000f': 'fingerprint01',
      'a0000000': 'museum',
      'a0000001': 'music'
    }
  },
  getMap: function (layer) {
    layer = layer || 'default';
    return this.map[layer];
  }
};
