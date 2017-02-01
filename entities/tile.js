const Tile = function(){
    Rect.apply(this, arguments);

    this.type = 'tyle';
    this.background = 'red';

    this.resolveCollision = function() {
        if (this.collide && this.background == 'red')
        {
            var me = this;
            this.background = 'yellow';
            setTimeout(function(){me.background = 'red'}, 500);
        }
        this.collide = false;
        return this;
    };

    return this;
};

// inherit from characterBase
Tile.prototype = Rect.prototype;
Tile.prototype.constructor = Tile;


