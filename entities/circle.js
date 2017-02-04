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
        for (let i in this.collisionEntities)
        {
            if (this.collisionEntities.hasOwnProperty(i)) {
                // onder
                if (
                    this.collisionEntities[i].getBoxTop() > this.getBoxTop() &&
                    this.collisionEntities[i].getBoxBottom() > this.getBoxTop() &&
                    this.AY > 0
                ) {
                    this.vector.Y = 0 - this.vector.Y;
                }// boven
                else if (
                    this.collisionEntities[i].getBoxBottom() < this.getBoxBottom() &&
                    this.collisionEntities[i].getBoxTop() < this.getBoxBottom() &&
                    this.AY < 0
                ) {
                    this.vector.Y = Math.abs(this.vector.Y);
                }// rechts
                else if (
                    this.collisionEntities[i].getBoxRight() > this.getBoxLeft() &&
                    this.collisionEntities[i].getBoxLeft() > this.getBoxLeft()&&
                    this.AX > 0
                ) {
                    this.vector.X = 0-this.vector.X;
                }// links
                else if (
                    this.collisionEntities[i].getBoxLeft() < this.getBoxRight() &&
                    this.collisionEntities[i].getBoxRight() < this.getBoxRight() &&
                    this.AX < 0
                ) {
                    this.vector.X = Math.abs(this.vector.X);
                }
            }
        }

        this.AX = (this.vector.X/3);
        this.AY = (this.vector.Y/3);

        this.collisionEntities = [];
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
        return this.X - this.size;
    };

    this.getBoxTop = function(){
        return this.Y - this.size;
    };

    this.getBoxRight = function(){
        return this.X + this.size;
    };

    this.getBoxBottom = function(){
        return this.Y + this.size;
    };
};

// inherit from characterBase
Circle.prototype = EntityBase.prototype;
Circle.prototype.constructor = Circle;