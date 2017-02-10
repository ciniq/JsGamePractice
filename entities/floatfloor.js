const FloatFloor = function(){
    Floor.apply(this, arguments);
    this.type = 'tile';
    this.doCheckSameObject = false;

    this.backgroundTypes = {
        left  : '13.png',
        mid   : '14.png',
        right : '15.png'
    };

    this.background = new Image();
    this.background.src = this.baseUrl + this.backgroundTypes.mid;

    this.H = 93;
    this.W = 128;

    this.dirY = false;

    this.animate = false;
    this.minY = 0;
    this.maxY = 0;

    this.updatePosition = function(delta) {
        if (this.animate){
            if (this.Y >= this.maxY) {
                this.dirY = false;
            } else if (this.Y <= this.minY) {
                this.dirY = true;
            }
        }

        // calculate the speed
        this.VX = this.AX*this.VXmax;
        this.VY = this.AY*this.VYmax;

        // Distance = speed * delta
        this.X += Math.round((this.dirX ? this.VX : 0-this.VX)*delta);
        this.Y += Math.round((this.dirY ? this.VY : 0-this.VY)*delta);
    };

    this.resolveCollision = function() {
        this.collide = false;
        return this;
    };

    this.setAnimation = function(pxl){
        this.animate = true;
        this.AY = 0.2;
        this.minY = this.Y-pxl;
        this.maxY = this.Y;
        return this;
    }

    return this;
};

// inherit from Tile
FloatFloor.prototype = Floor.prototype;
FloatFloor.prototype.constructor = FloatFloor;