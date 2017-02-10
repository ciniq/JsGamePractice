const Waterwave = function(){
    Tile.apply(this, arguments);
    this.type = 'tile';
    this.doCheckSameObject = false;
    this.collidable = false;

    this.background = new Image();
    this.background.src = this.baseUrl+'17.png';

    this.H = 50;
    this.W = 64;

    return this;
};

// inherit from Tile
Waterwave.prototype = Tile.prototype;
Waterwave.prototype.constructor = Waterwave;