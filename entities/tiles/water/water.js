const Water = function(){
    Tile.apply(this, arguments);
    this.type = 'tile';
    this.doCheckSameObject = false;
    this.baseUrl = 'entities/tiles/water/assets/';
    this.collidable = false;

    this.backgroundTypes = {
        wave : '17.png',
        blue : '18.png'
    };

    this.H = 50;
    this.W = 64;

    return this;
};

// inherit from Tile
Water.prototype = Tile.prototype;
Water.prototype.constructor = Water;