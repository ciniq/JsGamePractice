const Ball = function(){
    Circle.apply(this, arguments);

    this.type = 'ball';
    //randomise the ball
    this.randomize();
    //this.size = 15;

    return this;
};

// inherit from characterBase
Ball.prototype = Circle.prototype;
Ball.prototype.constructor = Ball;

/**
 * random placement, size and speed
 */
Ball.prototype.randomize = function(){
    var rand = Math.round(Math.random()*10),
        acc = rand/10;
    acc = 0.1 >= acc ? 0.2:acc;

    acc = 0.15;
    this.size = 10;//Math.round((5 * rand/10) * (rand == 0 ? 1: rand));

    this.setVector(Math.random() * 360);

    this.X = (this.ctx.canvas.width * Math.random());
    this.Y = (this.ctx.canvas.height * Math.random());

    // place within the canvas
    if(this.X < this.size){this.X = this.size;}
    else if(this.X > this.ctx.canvas.width - this.size){this.X = this.ctx.canvas.width - this.size;}
    if(this.Y < this.size){this.Y = this.size;}
    else if(this.Y > this.ctx.canvas.height - this.size){this.Y = this.ctx.canvas.height - this.size;}

    // in px/sec
    this.AX = (this.vector.X/5) ;
    this.AY = (this.vector.Y/5) ;

    this.backgrounds = ['green', 'blue', 'purple', 'red', 'black', 'yellow', 'grey', 'brown', 'magenta', 'lightgrey'];
    this.background = (undefined !== this.backgrounds[rand]?this.backgrounds[rand]:'black');
    this.originalBG = this.background;
};