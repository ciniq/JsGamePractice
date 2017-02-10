const Waterwave = function(){
    Tile.apply(this, arguments);
    this.type = 'tile';
    this.doCheckSameObject = false;

    this.background = new Image();
    this.background.src = this.baseUrl+'17.png';

    this.H = 99;
    this.W = 128;

    this.resolveCollision = function() {
        this.collide = false;
        return this;
    };

    this.draw = function(){
        this.ctx.drawImage(this.background, this.X, this.Y);
        return this;
    };

    return this;
};

// inherit from Tile
Waterwave.prototype = Tile.prototype;
Waterwave.prototype.constructor = Waterwave;