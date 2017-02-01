const Circle = function(){
    EntityBase.apply(this, arguments);

    this.collissionType = 'circle';
    this.originalBG = undefined;

    this.draw = function(){
        this.ctx.beginPath();
        this.ctx.arc(this.X,this.Y,this.size,0,Math.PI*2,true);
        this.ctx.fillStyle = this.background;
        this.ctx.fill();
        return this;
    };

    this.resolveCollision = function() {

        for (let i = 0; i < this.collisionEntities.length; i++)
        {
            // decide hit side!
            if(this.collisionEntities[i].getCentre())
            {
                this.vector.X = (0 < this.vector.X ? 0-this.vector.X : Math.abs(this.vector.X));
            }
            else if(this.collisionEntities[i].)
            {
                this.vector.Y = (0 < this.vector.Y ? 0-this.vector.Y : Math.abs(this.vector.Y));
            }
        }

        this.AX = (this.vector.X/5);
        this.AY = (this.vector.Y/5);

        this.collide = false;
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