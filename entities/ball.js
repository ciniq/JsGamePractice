var Ball = function(){
    Cirlce.apply(this, arguments);

    this.size = 5;
    var rand = Math.round(Math.random()*10);
    var acc = rand/10;
    acc = 0.1 >= acc ? 0.2:acc;


    this.X = this.ctx.canvas.width * Math.random();
    this.Y = this.ctx.canvas.height * Math.random();

    // in px/sec
    this.AX = Math.random() > 0.5 ? acc : (0-acc);
    this.AY = Math.random() > 0.5 ? acc : (0-acc);

    this.backgrounds = ['green', 'blue', 'purple', 'red', 'black', 'yellow', 'grey', 'brown', 'magenta', 'lightgrey'];
    this.background = (undefined !== this.backgrounds[rand]?this.backgrounds[rand]:'black');

    console.log(this.AX, this.AY, this.background)
    return this;
};

// inherit from characterBase
Ball.prototype = Cirlce.prototype;
Ball.prototype.constructor = Ball;