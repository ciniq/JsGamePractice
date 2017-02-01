const Rect = function(){
    EntityBase.apply(this, arguments);

    this.W = 0;
    this.H = 0;
    this.background = 'red';

    this.collissionType = 'square';

    this.setDimensions = function(width, height) {
        this.W = width;
        this.H = height;
        return this;
    };

    this.draw = function(){
        this.ctx.beginPath();
        this.ctx.rect(this.X,this.Y, this.W, this.H);
        this.ctx.fillStyle = this.background;
        this.ctx.stroke();
        this.ctx.fill();
        return this;
    };

    this.resolveCollision = function() {
        if (this.collide && this.background == 'red')
        {
            var me = this;
            this.background = 'yellow';
            setTimeout(function(){me.background = 'red'}, 500);
        }
        this.collide = false;
    };
};

// inherit from characterBase
Rect.prototype = EntityBase.prototype;
Rect.prototype.constructor = Rect;