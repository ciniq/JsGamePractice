var Quadtree = function(ctx){
    var me = this,
        nodes = [],
        ctx = ctx,
        maxItems = 2,
        maxDepth = 4;

    this.node = function(x, y, w, h, entities){
        this.X = x;
        this.Y = y;
        this.W = w;
        this.H = h;
        this.entities = entities;

        var splits = [{
            X: this.X,
            Y: this.Y,
            W: this.W/2,
            H: this.H/2,
            entities: []
        },{
            X: this.W/2,
            Y: this.Y,
            W: this.W/2,
            H: this.H/2,
            entities: []
        },{
            X: this.X,
            Y: this.H/2,
            W: this.W/2,
            H: this.H/2,
            entities: []

        },{
            X: this.W/2,
            Y: this.H/2,
            W: this.W/2,
            H: this.H/2,
            entities: []
        }],

        AABB = function(item, context){
            var a = item.getBoxRight() > context.X,
            b = item.getBoxTop() > context.Y,
            c = item.getBoxLeft() < context.W,
            d = item.getBoxBottom() < context.H,
            color =  item.background;


            var retval = (
                item.getBoxRight() > context.X &&
                item.getBoxTop() > context.Y &&
                item.getBoxLeft() < context.W &&
                item.getBoxBottom() < context.H
            );
            return retval;
        };

        //console.log(splits); die();
        if (maxItems < this.entities.length) {
            for (let i = 0; i < splits.length; i++) {
                for (let x = 0; x < this.entities.length; x++) {
                    //debugger;
                    if (AABB(this.entities[x], splits[i])) {
                        splits[i].entities.push(this.entities[x]);
                    }
                }
                // create a new square
                nodes.push(new me.node(splits[i].X, splits[i].Y, splits[i].W, splits[i].H, splits[i].entities))
            }
            this.entities = [];
        }
    };

    this.check = function(x, y, w, h, entities){
        nodes = [];
        nodes.push(new this.node(x, y, w, h, entities));
    };

    this.draw = function()
    {
        for (let i = 0; i < nodes.length; i++)
        {
            // debug
            ctx.beginPath();
            ctx.rect(nodes[i].X,nodes[i].Y,nodes[i].W, nodes[i].H);
            ctx.stroke();
        }

    };
};