var Game = function(){

    this.core = {};
    this.core.tileSize = 16;
    this.core.W = Math.floor((document.body.clientWidth - 60)/this.core.tileSize)*this.core.tileSize;
    this.core.H = Math.floor((document.body.clientHeight - 60)/this.core.tileSize)*this.core.tileSize;
    this.core.physics = new Physics();

    this.core.canvas = Utils.createEl(document.body, 'canvas', {
        width: this.core.W,
        height: this.core.H,
        border: '#000 1px solid'
    });

    this.core.canvas.width = this.core.W;
    this.core.canvas.height = this.core.H;
    this.core.ctx = this.core.canvas.getContext('2d');

    this.core.cycle = new Cycle(this);
    this.core.collision = {
        quad: new Quadtree(this.core.ctx)
    };

    this.entities = [];

    // anything over 2000 will start decreasing fps
    var BALL_AMOUNT = 5;

    for(var i = 0; i < BALL_AMOUNT; i++)
    {
        this.entities.push(new Ball(this.core.ctx, Math.floor(Math.random()*this.core.H), Math.floor(Math.random()*this.core.W)));
    }
};

Game.prototype.start = function(){
    this.core.cycle.setDrawLoop(this.doDraw);
    this.core.cycle.setLogicLoop(this.doLogic);
    this.core.cycle.start();
};

Game.prototype.stop = function(){
    this.core.cycle.stop();
};

Game.prototype.doDraw = function(){
    // clear the canvas
    this.core.ctx.clearRect(0,0,this.core.W, this.core.H);

    // draw each item
    for (var i = 0; i < this.entities.length; i++)
    {
        this.entities[i].draw();
    }
    this.core.collision.quad.draw();
};

Game.prototype.doLogic = function(delta){

    // build a quadtree
  //  var Quad = new Quadtree(this.ctx);

    for (let i = 0; i < this.entities.length; i++) {

        // request the new position
        this.entities[i].reqPos = this.entities[i].requestPosition(delta);
        this.entities[i].reqPos = this.entities[i].checkColission(this.entities[i].reqPos.x, this.entities[i].reqPos.y);
    }
        // apply gravity
        // reqPos.y = this.core.physics.doGravity(reqPos.y);

        // check if item collides

    for (let i = 0; i < this.entities.length; i++){

        this.entities[i].setPosition(this.entities[i].reqPos.x, this.entities[i].reqPos.y);
        delete this.entities[i].reqPos;
    }

    // check quadtree for this item
    this.core.collision.quad.check(0, 0, this.core.canvas.width, this.core.canvas.height, this.entities);
};