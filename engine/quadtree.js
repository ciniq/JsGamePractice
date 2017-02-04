var Quadtree = function(ctx){
    var me = this,
        ctx = ctx;

    this.maxItems = 2;
    this.maxDepth = 5;

    this.nodes = {};

    this.node = function(box, x, y, w, h, entities, depth){
        this.depth = depth||0;
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
            entities: [],
            depth: this.depth+1
        },{
            box: 'topright',
            X: this.X + this.W/2,
            Y: this.Y,
            W: this.W/2,
            H: this.H/2,
            entities: [],
            depth: this.depth+1
        },{
            box: 'bottomleft',
            X: this.X,
            Y: this.Y + this.H/2,
            W: this.W/2,
            H: this.H/2,
            entities: [],
            depth: this.depth+1
        },{
            box: 'bottomright',
            X: this.X + this.W/2,
            Y: this.Y + this.H/2,
            W: this.W/2,
            H: this.H/2,
            entities: [],
            depth: this.depth+1
        }];

        if (me.maxItems < this.entities.length && this.depth < me.maxDepth) {
            for (let i = 0; i < splits.length; i++) {
                for (let x = 0; x < this.entities.length; x++) {
                    if (Collision.AABB_quad_greedy(this.entities[x], splits[i])) {
                        splits[i].entities.push(this.entities[x]);
                    }
                }
                this.subnodes.push(new me.node(splits[i].box, splits[i].X, splits[i].Y, splits[i].W, splits[i].H, splits[i].entities, splits[i].depth))
            }

            this.entities = [];
        }
    };

    this.check = function(x, y, w, h, entities){
        var checkNodes = [],
            check = false;

        // create the tree
        me.nodes = new this.node('main', x, y, w, h, entities);

       // console.log(me.nodes); die();
        // check which nodes need to be checked for colission
        Utils.cascade(me.nodes, function(item){
            if (undefined !== item.entities && item.entities.length > 1) {
                checkNodes.push(item);
            }
        }, this);

        for (let i = 0; i < checkNodes.length; i++) {
            for (let x = 0; x < checkNodes[i].entities.length; x++) {
                this.checkEntityCollision(checkNodes[i].entities[x], x, checkNodes[i].entities);
            }
        }
    };

    this.checkEntityCollision = function(entity, key, entities) {
               for (let i = 0; i < entities.length; i++) {
            if (key !== i) {
                if(Collision.collision(entity, entities[i])) {
                    entity.setCollision(entities[i]);
                }
            }
        }
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
    };
};