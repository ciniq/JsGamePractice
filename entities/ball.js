const Ball = function(){
    Cirlce.apply(this, arguments);

    //randomise the ball
    //this.randomize();
    this.size = 15;



    return this;
};

// inherit from characterBase
Ball.prototype = Cirlce.prototype;
Ball.prototype.constructor = Ball;

Ball.prototype.randomize = function(){
    let rand = Math.round(Math.random()*10),
        acc = rand/10;
    acc = 0.1 >= acc ? 0.2:acc;
    this.size = Math.round((5 * rand/10) * (rand == 0 ? 1: rand));

    this.X = (this.ctx.canvas.width * Math.random());
    this.Y = (this.ctx.canvas.height * Math.random());

    if(this.X < this.size){this.X = this.size;}
    else if(this.X > this.ctx.canvas.width - this.size){this.X = this.ctx.canvas.width - this.size;}
    if(this.Y < this.size){this.Y = this.size;}
    else if(this.Y > this.ctx.canvas.height - this.size){this.Y = this.ctx.canvas.height - this.size;}

    // in px/sec
    this.AX = Math.random() > 0.5 ? acc : (0-acc);
    this.AY = Math.random() > 0.5 ? acc : (0-acc);

    this.backgrounds = ['green', 'blue', 'purple', 'red', 'black', 'yellow', 'grey', 'brown', 'magenta', 'lightgrey'];
    this.background = (undefined !== this.backgrounds[rand]?this.backgrounds[rand]:'black');
};