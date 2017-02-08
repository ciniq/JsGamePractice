const Tile = function(){
    Rect.apply(this, arguments);

    this.type = 'tile';
    this.background = 'red';

    this.resolveCollision = function() {
        if (this.collide)
        {
            this.background = (this.background == 'red' ? 'yellow' : 'red');
        }
        this.collide = false;
        return this;
    };

    return this;
};

// inherit from characterBase
Tile.prototype = Rect.prototype;
Tile.prototype.constructor = Tile;