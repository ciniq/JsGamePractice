const QuadTree = function(ctx){

    this.ctx = ctx;
    this.maxUnits = 2;
    this.maxDepth = 5;
    this.nodeTree = [];
    this.entities = [];

    this.node = function(x, y, w, h){
        this.X = x;
        this.Y = y;
        this.H = h;
        this.W = w;
    };
};

QuadTree.prototype.setEntities = function(entities){
    if(entities.length && 'string' !== typeof entities) {

    }
    else {
        console.log('Entities must be an array!');
    }
};

QuadTree.prototype.update = function(){

    this.NodeTree.push(new this.node(0,0,this.ctx.canvas.width,this.ctx.canvas.height));


};