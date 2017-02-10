const Circle = function(){
    EntityBase.apply(this, arguments);

    this.collissionType = 'circle';

    this.draw = function(){
        this.ctx.beginPath();
        this.ctx.arc(this.X,this.Y,this.size,0,Math.PI*2,true);
        this.ctx.fillStyle = this.background;
        this.ctx.fill();
        return this;
    };

    this.getCentre = function() {
        return {
            x: this.X,
            y: this.Y
        };
    };

    // getters for box collision
    this.getBoxLeft = function(){
        return Math.round(this.X - this.size);
    };

    this.getBoxTop = function(){
        return Math.round(this.Y - this.size);
    };

    this.getBoxRight = function(){
        return Math.round(this.X + this.size);
    };

    this.getBoxBottom = function(){
        return Math.round(this.Y + this.size);
    };
};

// inherit from characterBase
Circle.prototype = EntityBase.prototype;
Circle.prototype.constructor = Circle;