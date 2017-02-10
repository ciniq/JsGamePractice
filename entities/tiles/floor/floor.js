const Floor = function(){
    Tile.apply(this, arguments);
    this.type = 'tile';
    this.doCheckSameObject = false;
    this.baseUrl = 'entities/tiles/floor/assets/normal/';

    this.backgroundTypes = {
        left  : '1.png',
        mid   : '2.png',
        right : '3.png'
    };

    this.H = 64;
    this.W = 64;

    return this;
};

// inherit from Tile
Floor.prototype = Tile.prototype;
Floor.prototype.constructor = Floor;