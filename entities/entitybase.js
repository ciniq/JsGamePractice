var EntityBase = function(ctx, x, y){
    this.ctx = ctx;

    this.X = x;
    this.Y = y;
    this.size = 0;

    // acceleration
    this.AX = this.AY = 0;

    this.dirX = this.dirY = true;

    // in px/sec
    this.VX = this.VY = 0;
    this.VXmax = this.VYmax = 200;

    this.background = 'black';

    this.setPosition = function(x, y){
        this.X = x;
        this.Y = y;
        return this;
    };

    this.getPosition = function(){
        return {
            x: this.X,
            y: this.Y
        };
    };

    this.draw = function(){
        return this;
    };

    this.requestPosition = function(delta){

        this.VX = this.AX*this.VXmax;
        this.VY = this.AY*this.VYmax;

        // Distance = speed * delta
        return {
            x: this.X + Math.round((this.dirX ? this.VX : 0-this.VX)*delta),
            y: this.Y + Math.round((this.dirY ? this.VY : 0-this.VY)*delta)
        };
    };

    this.onCollision = function(dir){

        // seeing this is a stationary target, nothing happens
        return this;
    };

    return this;
};