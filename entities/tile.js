const Tile = function(){
    Rect.apply(this, arguments);

    this.type = 'tile';
    this.background = undefined;
    this.doCheckSameObject = false;
    this.baseUrl = 'entities/assets/tiles/freetileset/png/Tiles/';
    this.animate = false;

    this.resolveCollision = function() {
        this.collide = false;
        return this;
    };

    this.draw = function() {
        if (this.background) {
            this.ctx.drawImage(this.background, this.X, this.Y, this.W, this.H);
        }
        return this;
    };

    this.setAnimationY = function(pxl, speed){
        this.animate = true;
        this.AY = speed;
        this.minY = this.Y-pxl;
        this.maxY = this.Y;
        return this;
    };

    this.setAnimationX = function(pxl, speed){
        this.animate = true;
        this.AY = speed;
        this.minY = this.Y-pxl;
        this.maxY = this.Y;
        return this;
    }


    return this;
};

// inherit from characterBase
Tile.prototype = Rect.prototype;
Tile.prototype.constructor = Tile;