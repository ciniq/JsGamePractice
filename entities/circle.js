const Circle = function(){
    EntityBase.apply(this, arguments);

    this.type = 'circle';

    this.draw = function(){
        this.ctx.beginPath();
        this.ctx.arc(this.X,this.Y,this.size,0,Math.PI*2,true);
        this.ctx.fillStyle = this.background;
        this.ctx.fill();
        return this;
    };

    this.onCollision = function(dir){
        if (dir == 'X'){
            this.dirX = !this.dirX;
        }

        if (dir == 'Y'){
            this.dirY = !this.dirY;
        }

        return this;
    };

    this.checkColission = function(x, y){

        // very fucking simple collision detection
        if (x - this.size < 0 || x + this.size > this.ctx.canvas.width)
        {
            this.onCollision('X');
            x = this.X;
        }

        if (y - this.size < 0 || y + this.size > this.ctx.canvas.height)
        {
            this.onCollision('Y');
            y = this.Y;
        }

        return {
            x: x,
            y: y
        };
    };

    // getters for box collision
    this.getBoxLeft = function(){
        return this.X - (this.size/2);
    };

    this.getBoxTop = function(){
        return this.Y - (this.size/2);
    };

    this.getBoxRight = function(){
        return this.X + (this.size/2);
    };

    this.getBoxBottom = function(){
        return this.Y + (this.size/2);
    };
};

// inherit from characterBase
Circle.prototype = EntityBase.prototype;
Circle.prototype.constructor = Circle;