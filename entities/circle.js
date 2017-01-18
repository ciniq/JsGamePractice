var Cirlce = function(){
    EntityBase.apply(this, arguments);

    this.draw = function(){
        this.ctx.beginPath();
        this.ctx.arc(this.X,this.Y,this.size,0,Math.PI*2,true);
        this.ctx.fillStyle = this.background;
        this.ctx.stroke();
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
};

// inherit from characterBase
Cirlce.prototype = EntityBase.prototype;
Cirlce.prototype.constructor = Cirlce;