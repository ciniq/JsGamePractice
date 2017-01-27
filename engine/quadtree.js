var stop = false;
var Quadtree = function(ctx){
    var me = this,
        ctx = ctx,
        maxItems = 1,
        maxDepth = 4;

    this.nodes = {};

    this.node = function(box, x, y, w, h, entities){
        this.box = box;
        this.X = x;
        this.Y = y;
        this.W = w;
        this.H = h;
        this.entities = entities;
        this.subnodes = [];

        var splits = [{
            index: 1,
            box: 'topleft',
            X: this.X,
            Y: this.Y,
            W: this.W/2,
            H: this.H/2,
            entities: []
        },{
            box: 'topright',
            X: this.X + this.W/2,
            Y: this.Y,
            W: this.W/2,
            H: this.H/2,
            entities: []
        },{
            box: 'bottomleft',
            X: this.X,
            Y: this.Y + this.H/2,
            W: this.W/2,
            H: this.H/2,
            entities: []
        },{
            box: 'bottomright',
            X: this.X + this.W/2,
            Y: this.Y + this.H/2,
            W: this.W/2,
            H: this.H/2,
            entities: []
        }],

        AABB = function(item, context){
            return (
                item.getBoxRight() > context.X &&
                item.getBoxTop() > context.Y &&
                item.getBoxLeft() < (context.W + context.X) &&
                item.getBoxBottom() < (context.H + context.Y)
            );
        };

        if (maxItems < this.entities.length) {
            for (let i = 0; i < splits.length; i++) {
                for (let x = 0; x < this.entities.length; x++) {
                    if (AABB(this.entities[x], splits[i])) {
                        splits[i].entities.push(this.entities[x]);
                    }
                }
            }

            for (let i = 0; i < splits.length; i++) {
                // create a new quad node
                this.subnodes.push(new me.node(splits[i].box, splits[i].X, splits[i].Y, splits[i].W, splits[i].H, splits[i].entities))
            }
            this.entities = [];
        }
    };

    this.check = function(x, y, w, h, entities){
        me.nodes = new this.node('main', x, y, w, h, entities);
    };

    this.draw = function()
    {
        var i = 0;
        Utils.cascade(me.nodes, function(node){
            i++;
            ctx.beginPath();
            ctx.rect(node.X,node.Y,node.W, node.H);
            ctx.stroke();
        }, this);

        if(i > 8)
        {
            //console.log(me.nodes); die();
        }
    };
};