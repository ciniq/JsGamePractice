const Rect = function(){
    EntityBase.apply(this, arguments);

    this.type = 'square';
};

// inherit from characterBase
Rect.prototype = EntityBase.prototype;
Rect.prototype.constructor = Rect;

Rect.prototype.draw = function(){
    this.ctx.beginPath();
    this.ctx.rect(this.X,this.Y,this.H, this.W);
    this.ctx.fillStyle = this.background;
    this.ctx.stroke();
    this.ctx.fill();
    return this;
};

Rect.prototype.onCollision = function(dir){

    // this will have it's own collision
    return this;
};