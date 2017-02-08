const Rect = function(){
    EntityBase.apply(this, arguments);

    this.W = 0;
    this.H = 0;
    this.background = 'red';

    this.collissionType = 'square';

    this.setDimensions = function(width, height) {
        this.W = Math.round(width);
        this.H = Math.round(height);
        return this;
    };

    this.draw = function(){
        this.ctx.beginPath();
        this.ctx.rect(this.X,this.Y, this.W, this.H);
        this.ctx.fillStyle = this.background;
        this.ctx.fill();
        return this;
    };
};

// inherit from characterBase
Rect.prototype = EntityBase.prototype;
Rect.prototype.constructor = Rect;