var Game = function(){

    var me = this;
    this.core = {};
    this.core.tileSize = 16;
    this.core.W = Math.floor(1000/this.core.tileSize)*this.core.tileSize;
    this.core.H = Math.floor(750/this.core.tileSize)*this.core.tileSize;

    this.core.background = new Image();
    this.core.background.src = 'entities/assets/tiles/freetileset/png/BG/background.png'

    this.core.canvas = Utils.createEl(document.body, 'canvas', {
        width: this.core.W,
        height: this.core.H,
        border: '#000 1px solid'
    });

    this.core.canvas.width = this.core.W;
    this.core.canvas.height = this.core.H;
    this.core.ctx = this.core.canvas.getContext('2d');

    this.core.cycle = new Cycle(this);
    this.core.controlls = new Control();
    this.core.buttons = {};

    this.core.controlls.handle = function(buttons) {
        me.core.buttons = buttons;
    };

    this.core.collision = {
        quad: new Quadtree(this.core.ctx)
    };

    this.entities = [];
    this.controlledEntities = [];

    //// top
    //this.entities.push(new Tile(this.core.ctx, 0, 0).setDimensions(this.core.W, 8));

    // bottom
   // this.entities.push(new Tile(this.core.ctx, 0, this.core.H-8).setDimensions(this.core.W, 8));

    //// left
    //this.entities.push(new Tile(this.core.ctx, 0, 8).setDimensions(8, this.core.H-16));
    //
    //// right
    //this.entities.push(new Tile(this.core.ctx, this.core.W-8, 8).setDimensions(8, this.core.H-16));


    // water
    this.entities.push(new Waterwave(this.core.ctx, 128, this.core.H - 99));
    this.entities.push(new Waterwave(this.core.ctx, 256, this.core.H - 99));
    this.entities.push(new Waterwave(this.core.ctx, 384, this.core.H - 99));
    this.entities.push(new Waterwave(this.core.ctx, 502, this.core.H - 99));
    this.entities.push(new Waterwave(this.core.ctx, 630, this.core.H - 99));

    // floor left
    this.entities.push(new Floor(this.core.ctx, 0, this.core.H - 128).setType('mid'));
    this.entities.push(new Floor(this.core.ctx, 128, this.core.H - 128).setType('right'));

    // floor Right
    this.entities.push(new Floor(this.core.ctx, 630, this.core.H - 128).setType('left'));
    this.entities.push(new Floor(this.core.ctx, 758, this.core.H - 128).setType('mid'));
    this.entities.push(new Floor(this.core.ctx, 886, this.core.H - 128).setType('right'));

    // floatfloor
    this.entities.push(new FloatFloor(this.core.ctx, 256, this.core.H - 128).setType('left').setAnimation(200));
    this.entities.push(new FloatFloor(this.core.ctx, 384, this.core.H - 128).setType('mid').setAnimation(200));
    this.entities.push(new FloatFloor(this.core.ctx, 502, this.core.H - 128).setType('right').setAnimation(200));

    // platform
    this.entities.push(new FloatFloor(this.core.ctx, this.core.W - 256, this.core.H - 328).setType('left'));
    this.entities.push(new FloatFloor(this.core.ctx, this.core.W - 128, this.core.H - 328).setType('mid'));

    // add the knight
    var knight = new Knight(this.core.ctx, 75, 100).setDimensions(53, 64);

    this.entities.push(knight);
    this.controlledEntities.push(knight);
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

    // draw the background
    this.core.ctx.drawImage(this.core.background, 0, 0);

    // draw each item
    for (var i = 0; i < this.entities.length; i++) {
        this.entities[i].draw();
    }
};

Game.prototype.doLogic = function(delta){

    // set new positions
    for (let i = 0; i < this.entities.length; i++) {

        // set the new position
        this.entities[i].handleInput(this.core.buttons).updatePosition(delta);

        // handle physics
        if (this.entities[i].type === 'char')
        {
            this.entities[i].applyGravity();
        }
    }



    // check colissions
    this.core.collision.quad.check(0, 0, this.core.canvas.width, this.core.canvas.height, this.entities);

    // resolve colissions
    for (let i = 0; i < this.entities.length; i++) {
        if (this.entities[i].collide){
            this.entities[i].resolveCollision();
        }
    }
};
