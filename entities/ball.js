var Ball = function(ctx, x, y){

    this.ctx = ctx;

    this.Y = x;
    this.X = y;
    this.size = 5;

    var rand = Math.round(Math.random()*10);
    this.speed = rand;

    // in px/sec
    this.VX = Math.random() > 0.5 ? this.speed : (0-this.speed);
    this.VY = Math.random() > 0.5 ? this.speed : (0-this.speed);

    this.backgrounds = ['green', 'blue', 'purple', 'red', 'black', 'yellow', 'grey', 'brown', 'magenta', 'lightgrey'];
    this.background = this.backgrounds[rand];
    return this;
};

Ball.prototype.setPosition = function(x, y){
    this.X = x;
    this.Y = y;
    return this;
};

Ball.prototype.getPosition = function(){
    return {
        x: this.X,
        y: this.Y
    };
};

Ball.prototype.draw = function(){
    this.ctx.beginPath();
    this.ctx.arc(this.X,this.Y,this.size,0,Math.PI*2,true);
    this.ctx.fillStyle = this.background;
    this.ctx.stroke();
    this.ctx.fill();
    return this;
};

Ball.prototype.requestPosition = function(delta){

    var projectedX = this.X + ((this.VX * (1 + delta/100))/10),
        projectedY = this.Y + ((this.VY * (1 + delta/100))/10);

    return {
        x: projectedX,
        y: projectedY
    }
};

Ball.prototype.onCollision = function(dir){

    if (dir == 'X'){
        this.VX = Math.round((0 < this.VX ? 0-this.speed : this.speed));
    }

    if (dir == 'Y'){
        this.VY = Math.round((0 < this.VY ? 0-this.speed : this.speed));
    }

    return this;
};