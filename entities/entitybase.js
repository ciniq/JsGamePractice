const EntityBase = function(ctx, x, y){
    this.ctx = ctx;

    this.id = Utils.createId();
    this.type = undefined;
    this.collissionType = undefined;
    this.X = x;
    this.Y = y;
    this.size = 0;
    this.vector = {X:0,Y:0};
    this.collide = false;
    this.collisionEntities = {};

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

    this.setVector = function(degree) {
        var rad = degree*(Math.PI/180);
        this.vector.X = Math.cos(rad);
        this.vector.Y = Math.sin(rad);
        return this;
    };

    this.accelerate = function(x, y){
        if (x){
            this.AX = (this.AX < 1 ? this.AX+0.03 : 1);
        }

        if (y){
            this.AY = (this.AY < 1 ? this.AY+0.03 : 1);
        }
    };

    this.getCentre = function() {
        return {
            x: this.X + (this.W/2),
            y: this.Y + (this.H/2)
        };
    };

    this.draw = function(){
        return this;
    };

    this.updatePosition = function(delta){

        // calculate the speed
        this.VX = this.AX*this.VXmax;
        this.VY = this.AY*this.VYmax;

        // Distance = speed * delta
        this.X += ((this.dirX ? this.VX : 0-this.VX)*delta);
        this.Y += ((this.dirY ? this.VY : 0-this.VY)*delta);
    };

    this.setCollision = function(entity) {
        this.collide = true;
        this.collisionEntities[entity.id] = entity;
    };

    this.resolveCollision = function() {
        // seeing this is a stationary target, nothing happens
        this.collide = false;
        return this;
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