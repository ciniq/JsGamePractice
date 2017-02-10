const Floor = function(){
    Tile.apply(this, arguments);
    this.type = 'tile';
    this.doCheckSameObject = false;

    this.backgroundTypes = {
        left  : '1.png',
        mid   : '2.png',
        right : '3.png'
    };

    this.background = new Image();
    this.background.src = this.baseUrl + this.backgroundTypes.mid;

    this.H = 128;
    this.W = 128;

    this.resolveCollision = function() {
        this.collide = false;
        return this;
    };

    this.draw = function(){
        this.ctx.drawImage(this.background, this.X, this.Y);
        return this;
    };

    this.setType = function(type)
    {
        if (undefined !== this.backgroundTypes[type]){
            this.background = new Image();
            this.background.src = this.baseUrl + this.backgroundTypes[type];
        }
        return this;
    };

    return this;
};

// inherit from Tile
Floor.prototype = Tile.prototype;
Floor.prototype.constructor = Floor;