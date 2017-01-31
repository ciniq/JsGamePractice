const Rect = function(){
    EntityBase.apply(this, arguments);

    this.W = 10;
    this.H = 100;
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

    this.getCentre = function() {
        return {
            x: this.X + (this.W/2),
            y: this.Y + (this.H/2)
        };
    };

    this.onCollision = function(collisionData) {
        if (collisionData.colliding)
        {
            var me = this;
            this.background = 'yellow';
            setTimeout(function(){me.background = 'red'}, 500);
        }


    };
};

// inherit from characterBase
Rect.prototype = EntityBase.prototype;
Rect.prototype.constructor = Rect;