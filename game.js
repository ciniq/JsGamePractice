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
//    var BALL_AMOUNT = 50;

    //for(var i = 0; i < BALL_AMOUNT; i++)
    //{
    //    this.entities.push(new Ball(this.core.ctx, Math.floor(Math.random()*this.core.H), Math.floor(Math.random()*this.core.W)));
    //}

    // top
    this.entities.push(new Tile(this.core.ctx, 0, 0).setDimensions(this.core.W, 8));

    // bottom
    this.entities.push(new Tile(this.core.ctx, 0, this.core.H-8).setDimensions(this.core.W, 8));

    // left
    this.entities.push(new Tile(this.core.ctx, 0, 8).setDimensions(8, this.core.H-16));

    // right
    this.entities.push(new Tile(this.core.ctx, this.core.W-8, 8).setDimensions(8, this.core.H-16));

    this.entities.push(new Tile(this.core.ctx, 100, 200).setDimensions(200, 8));
    this.entities.push(new Tile(this.core.ctx, 200, 300).setDimensions(200, 8));
    this.entities.push(new Tile(this.core.ctx, 300, 400).setDimensions(200, 8));
    this.entities.push(new Tile(this.core.ctx, 400, 600).setDimensions(200, 8));

    // add the knight
    this.entities.push(new Knight(this.core.ctx, 100, 50).setDimensions(64, 64));

};

Game.prototype.start = function() {
    this.core.cycle.setDrawLoop(this.doDraw);
    this.core.cycle.setLogicLoop(this.doLogic);
    this.core.cycle.start();
};

Game.prototype.stop = function() {
    this.core.cycle.stop();
};

Game.prototype.doDraw = function() {
    // clear the canvas
    this.core.ctx.clearRect(0,0,this.core.W, this.core.H);

    // draw each item
    for (var i = 0; i < this.entities.length; i++) {
        this.entities[i].draw();
    }
    //this.core.collision.quad.draw();
};

Game.prototype.doLogic = function(delta){

    // set new positions
    for (let i = 0; i < this.entities.length; i++) {
        // set the new position
        this.entities[i].updatePosition(delta);
    }

    // handle physics

    // check colissions
    this.core.collision.quad.check(0, 0, this.core.canvas.width, this.core.canvas.height, this.entities);

    // resolve colissions
    for (let i = 0; i < this.entities.length; i++) {
        if (this.entities[i].collide){
            this.entities[i].resolveCollision();
        }
    }
};