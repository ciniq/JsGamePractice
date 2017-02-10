const Tile = function(){
    Rect.apply(this, arguments);

    this.type = 'tile';
    this.background = 'black';
    this.doCheckSameObject = false;
    this.baseUrl = 'entities/assets/tiles/freetileset/png/Tiles/';

    this.resolveCollision = function() {
        this.collide = false;
        return this;
    };

    return this;
};

// inherit from characterBase
Tile.prototype = Rect.prototype;
Tile.prototype.constructor = Tile;