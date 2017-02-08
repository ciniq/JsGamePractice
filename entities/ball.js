const Ball = function(){
    Circle.apply(this, arguments);

    this.type = 'ball';
    //randomise the ball
    this.randomize();
    //this.size = 15;

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
};

// inherit from characterBase
Ball.prototype = Circle.prototype;
Ball.prototype.constructor = Ball;

/**
 * random placement, size and speed
 */
Ball.prototype.randomize = function(){
    var rand = Math.round(Math.random()*10);

    this.size = Math.round((5 * rand/10) * (rand == 0 ? 1: rand));

    this.setVector(Math.random() * 360);
    //this.setVector(90);

    this.X = (this.ctx.canvas.width * Math.random());
    this.Y = (this.ctx.canvas.height * Math.random());

    // place within the canvas
    if(this.X < this.size +10){this.X = this.size+10;}
    else if(this.X > this.ctx.canvas.width - this.size-10){this.X = this.ctx.canvas.width - this.size-10;}
    if(this.Y < this.size+10){this.Y = this.size+10;}
    else if(this.Y > this.ctx.canvas.height - this.size-10){this.Y = this.ctx.canvas.height - this.size-10;}

    // in px/sec
    this.AX = (this.vector.X/3) ;
    this.AY = (this.vector.Y/3) ;

    this.backgrounds = ['green', 'blue', 'purple', 'red', 'black', 'yellow', 'grey', 'brown', 'magenta', 'lightgrey'];
    this.background = (undefined !== this.backgrounds[rand]?this.backgrounds[rand]:'black');
};