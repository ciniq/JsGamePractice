const Rect = function(){
    EntityBase.apply(this, arguments);

    this.W = 10;
    this.H = 40;
    this.background = 'red';

    this.type = 'square';

    this.draw = function(){

        this.ctx.beginPath();
        this.ctx.rect(this.X,this.Y, this.W, this.H);
        this.ctx.fillStyle = this.background;
        this.ctx.stroke();
        this.ctx.fill();
        return this;
    };

    this.checkColission = function(){
        return {
            x: this.X,
            y: this.Y
        }
    };

};

// inherit from characterBase
Rect.prototype = EntityBase.prototype;
Rect.prototype.constructor = Rect;

