const EntityBase = function(ctx, x, y){
    this.ctx = ctx;

    this.id = Utils.createId();
    this.X = x;
    this.Y = y;
    this.size = 0;

    // acceleration
    this.AX = this.AY = 0;

    this.dirX = this.dirY = true;

    // in px/sec
    this.VX = this.VY = 0;
    this.VXmax = this.VYmax = 300;

    this.background = 'black';

    this.setPosition = function(x, y){
        this.X = Math.round(x);
        this.Y = Math.round(y);
        return this;
    };

    this.getPosition = function(){
        return {
            x: this.X,
            y: this.Y
        };
    };

    this.accelerate = function(x, y){
        if (x){
            this.AX = (this.AX < 1 ? this.AX+0.03 : 1);
        }

        if (y){
            this.AY = (this.AY < 1 ? this.AY+0.03 : 1);
        }
    };

    this.draw = function(){
        return this;
    };

    this.requestPosition = function(delta){

        this.VX = this.AX*this.VXmax;
        this.VY = this.AY*this.VYmax;

        // Distance = speed * delta
        return {
            x: this.X + ((this.dirX ? this.VX : 0-this.VX)*delta),
            y: this.Y + ((this.dirY ? this.VY : 0-this.VY)*delta)
        };
    };

    this.onCollision = function(dir){

        // seeing this is a stationary target, nothing happens
        return this;
    };

    this.checkColission = function(){
        // stationary items don't need collision checks
        return false;
    };

    // getters for box collision
    this.getBoxLeft = function(){
        return this.X;
    };

    this.getBoxTop = function(){
        return this.Y;
    };

    this.getBoxRight = function(){
        return this.X + this.W;
    };

    this.getBoxBottom = function(){
        return this.Y + this.H;
    };

    return this;
};