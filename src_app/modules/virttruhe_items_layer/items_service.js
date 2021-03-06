app.services.items = {
  items: [
    {
      'id':'pine_(closed)',
      'name':'Pine (closed)',
      'imageName':'pine_(closed).svg',
      'description':'A Pine. They are often put into fires for their cracking sounds',
      'stackable':'false',
      'action':'combine',
      'type':'pine',
      'set':'garden'
    },
    {
      'id':'pine_(open)',
      'name':'Pine (open)',
      'imageName':null,
      'description':'It\'s cracked from the heat',
      'stackable':'false',
      'action':'take_seeds',
      'type':'pine',
      'set':'garden'
    },
    {
      'id':'pine_seed',
      'name':'Pine seed',
      'imageName':null,
      'description':'Can be planted',
      'stackable':'true',
      'action':'combine',
      'type':'seed',
      'set':'garden'
    },
    {
      'id':'pot',
      'name':'Flower pot',
      'imageName':null,
      'description':'Can grow something',
      'stackable':'false',
      'action':'combine',
      'type':'pot',
      'set':'garden'
    },
    {
      'id':'pot1',
      'name':'Pot with pineshine',
      'imageName':null,
      'description':'A light emitting flower',
      'stackable':'false',
      'action':null,
      'type':'pot',
      'set':'garden'
    },
    {
      'id':'flower01',
      'name':'Krokus',
      'imageName':null,
      'description':'...',
      'stackable':'true',
      'action':null,
      'type':'flower',
      'set':'garden'
    },
    {
      'id':'flower02',
      'name':'Tulpe',
      'imageName':null,
      'description':'...',
      'stackable':'true',
      'action':null,
      'type':'flower',
      'set':'garden'
    },
    {
      'id':'flower03',
      'name':'Rose',
      'imageName':null,
      'description':'...',
      'stackable':'true',
      'action':null,
      'type':'flower',
      'set':'garden'
    },
    {
      'id':'beer',
      'name':'Beer',
      'imageName':null,
      'description':'A bottle of cool beer',
      'stackable':'true',
      'action':'drink',
      'type':'alcohol',
      'set':'general'
    },
    {
      'id':'wine',
      'name':'Wine',
      'imageName':null,
      'description':'A bottle of cheap wine',
      'stackable':'true',
      'action':'drink',
      'type':'alcohol',
      'set':'general'
    },
    {
      'id':'knife',
      'name':'Knife',
      'imageName':null,
      'description':'Normal kitchen knife',
      'stackable':'false',
      'action':'cut',
      'type':'tools',
      'set':'general'
    },
    {
      'id':'intro',
      'name':'Introduction',
      'imageName':'memory_card.png',
      'description':'Short and long description about VIRTTRUHE',
      'stackable':'false',
      'action':'listen',
      'type':'message',
      'set':'general'
    },
    {
      'id':'24dtf_song1',
      'name':'Song: 24 days to fall - New Frontiers',
      'imageName':null,
      'description':'Song from the Album "A buggle wardshen"',
      'stackable':'false',
      'action':'listen',
      'type':'song',
      'set':'music'
    },
    {
      'id':'24dtf_album01',
      'name':'Album: A buggle wardshen',
      'imageName':null,
      'description':'Album from "24 days to fall"',
      'stackable':'false',
      'action':'show_songs',
      'type':'album',
      'set':'music'
    },
    {
      'id':'st_wheel',
      'name':'Steering Wheel',
      'imageName':null,
      'description':'Part of a car. It is used to steer the car',
      'stackable':'false',
      'action':'combine',
      'type':'element',
      'set':'museum'
    },
    {
      'id':'pedal',
      'name':'Gas pedal',
      'imageName':null,
      'description':'Part of a car. It is used to increase speed',
      'stackable':'false',
      'action':'combine',
      'type':'element',
      'set':'museum'
    },
    {
      'id':'frame',
      'name':'Car frame',
      'imageName':null,
      'description':'The skelleton of a car',
      'stackable':'false',
      'action':'combine',
      'type':'element',
      'set':'museum'
    },
    {
      'id':'car_parts1',
      'name':'Frame with steering wheel',
      'imageName':null,
      'description':'Combination of Frame and steering wheel',
      'stackable':'false',
      'action':'combine',
      'type':'element',
      'set':'museum'
    },
    {
      'id':'car_parts2',
      'name':'Frame with pedal',
      'imageName':null,
      'description':'Combination of Frame and gas pedal',
      'stackable':'false',
      'action':'combine',
      'type':'element',
      'set':'museum'
    },
    {
      'id':'car1',
      'name':'Mercedes 230 E',
      'imageName':null,
      'description':'The timeless Mercedes 230 E',
      'stackable':'false',
      'action':null,
      'type':'car',
      'set':'museum'
    },
    {
      'id':'note01',
      'name':'Crime Scene',
      'imageName':null,
      'description':'The body lies face down on the floor. Blood spilled everywhere...',
      'stackable':'false',
      'action':null,
      'type':'note',
      'set':'crime'
    },
    {
      'id':'note02',
      'name':'Clue "Hat"',
      'imageName':null,
      'description':'This hat looks like the one from the guy in the bar...',
      'stackable':'false',
      'action':null,
      'type':'note',
      'set':'crime'
    },
    {
      'id':'fingerp_scanner',
      'name':'Finger print scanner',
      'imageName':null,
      'description':'Search for finger prints on items',
      'stackable':'false',
      'action':'combine',
      'type':'tools',
      'set':'crime'
    },
    {
      'id':'pills',
      'name':'Sleeping Pills',
      'imageName':null,
      'description':'Super effective Sleeping pills. One is missing',
      'stackable':'false',
      'action':'filler',
      'type':'evidence',
      'set':'crime'
    },
    {
      'id':'fingerprint01',
      'name':'Wifes Finger print',
      'imageName':null,
      'description':'found on the package of sleeping pills. hmm... as far as I know she has no problem getting to sleep...',
      'stackable':'false',
      'action':null,
      'type':'evidence',
      'set':'crime'
    }
  ],
  loadItems: function () {
    // TODO xhr request, local storage and such
  },
  getAllItems: function () {
    return this.items;
  },
  getItem: function (itemId) {
    if (!itemId) {
      return null;
    }
    var item = this.items.find(function (item) {
      return item.id === itemId;
    });
    if (!item) {
      window.console.error('no such item: ' + itemId);
      return null;
    }
    return item;
  },
  itemHasAction: function (itemId) {
    var item = this.getItem(itemId);
    return item && item.action;
  }
};

