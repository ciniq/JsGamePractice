var Game = function(){

    this.core = {};
    this.core.tileSize = 16;
    this.core.W = Math.floor((document.body.clientWidth - 60)/this.core.tileSize)*this.core.tileSize;
    this.core.H = Math.floor((document.body.clientHeight - 60)/this.core.tileSize)*this.core.tileSize;

    this.core.canvas = Utils.createEl(document.body, 'canvas', {
        width: this.core.W,
        height: this.core.H,
        border: '#000 1px solid'
    });

    this.core.canvas.width = this.core.W;
    this.core.canvas.height = this.core.H;
    this.core.ctx = this.core.canvas.getContext('2d');

    this.core.cycle = new Cycle(this);
    this.entities = [];

    // anything over 2000 will start decreasing fps
    var BALL_AMOUNT = 10;

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

Game.prototype.doDraw = function(delta){
    this.core.ctx.clearRect(0,0,this.core.W, this.core.H);

    for (var i = 0; i < this.entities.length; i++)
    {
        this.entities[i].draw();
    }
};

Game.prototype.doLogic = function(delta){
    for (var i = 0; i < this.entities.length; i++)
    {
        var reqPos = this.entities[i].requestPosition(delta),
            curPos = this.entities[i].getPosition(delta);

        // very fucking simple collision detection
        if (reqPos.x <= 0 || reqPos.x >= this.core.W)
        {
            this.entities[i].onCollision('X');
            reqPos.x = curPos.x;
        }

        if (reqPos.y <= 0 || reqPos.y >= this.core.H)
        {
            this.entities[i].onCollision('Y');
            reqPos.y = curPos.y;
        }

        this.entities[i].setPosition(reqPos.x, reqPos.y);
    }
};