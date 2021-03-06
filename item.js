Game.Item = function(properties) {
    properties = properties || {};
    
    Game.DynamicGlyph.call(this, properties);
    this._templateName = properties['templateName'] || '';
    this._passable = properties['passable'] || true;
    this._name = properties['name'] || '';
    this._desc = properties['desc'] || '';

    this._x = null;
    this._y = null;
};

Game.Item.extend(Game.DynamicGlyph);

Game.Item.prototype.getName = function() {
    return this._name;
};

// item mixins

Game.ItemMixins = {};

Game.ItemMixins.Edible = {
    name: 'Edible',
    init: function(template) {
        this.foodVal = template['foodVal'] || 0;
        this.hpVal = template['hpVal'] || 0;
    },
    eat: function(entity, invIndex) {
        if (entity.hasMixin('Killable')) {
            entity.modifyHP(this, this.hpVal);
        }
        entity.removeItem(invIndex);
    }
};

Game.ItemMixins.Equippable = {
    name: 'Equippable',
    init: function(template) {
        this._attackVal = template['attackVal'] || 0;
        this._wieldable = template['wieldable'] || false;
        this._wearable = template['wearable'] || false;        
    },
    getAttackValue: function() {
        return this._attackVal;
    }
};

Game.ItemMixins.Throwable = {
    name: 'Throwable',
    init: function(template) {
    }
};


// item repo & definitions

Game.ItemRepository = new Game.Repository('items', Game.Item);

Game.ItemRepository.define('smallrock', {
    name: 'small rock',
    chr: '*',
    fg: 'gray',
    mixins: [Game.ItemMixins.Throwable]
});

Game.ItemRepository.define('book', {
    name: 'book',
    chr: '+',
    fg: 'brown',
    mixins: [Game.ItemMixins.Throwable]
});

Game.ItemRepository.define('mushroom', {
    name: 'mushroom',
    chr: '\,',
    fg: 'darkkhaki',
    foodVal: 1,
    hpVal: 2,
    mixins: [Game.ItemMixins.Edible]
});

Game.ItemRepository.define('dagger', {
    name: 'dagger',
    chr: ')',
    fg: 'grey',
    wieldable: true,
    attackVal: 2,
    desc: 'A well-balanced iron dagger.',
    mixins: [Game.ItemMixins.Equippable, Game.ItemMixins.Throwable]
}, { disableRandomCreation: true });

Game.ItemRepository.define('corpse', {
    name: 'corpse',
    chr: '%',
    foodValue: 75,
    consumptions: 1,
    mixins: [Game.ItemMixins.Edible]
}, { disableRandomCreation: true });
