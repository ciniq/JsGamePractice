const BaseObject = function(){
    Tile.apply(this, arguments);
    this.type = 'tile';
    this.doCheckSameObject = false;
    this.collidable = false;

    this.baseUrl = 'entities/objects/assets/normal/';

    this.backgroundTypes = {
        crate: {
            src: 'Crate.png',
            collidable: true,
            width: 64,
            height: 64
        },
        bush1: {
            src: 'Bush_1.png',
            collidable: false,
            width: 128,
            height: 64
        },
        bush2: {
            src: 'Bush_2.png',
            collidable: false,
            width: 100,
            height: 64
        },
        mushroompink: {
            src: 'Mushroom_1.png',
            collidable: false,
            width: 50,
            height: 40
        },
        mushroomred: {
            src: 'Mushroom_2.png',
            collidable: false,
            width: 50,
            height: 40
        },
        sign1: {
            src: 'Sign_1.png',
            collidable: false,
            width: 64,
            height: 64
        },
        sign2: {
            src: 'Sign_2.png',
            collidable: false,
            width: 64,
            height: 64
        },
        stone: {
            src: 'Stone.png',
            collidable: false,
            width: 100,
            height: 64
        },
        tree: {
            src: 'Tree_1.png',
            collidable: false,
            width: 128,
            height: 64
        },
        tree2: {
            src: 'Tree_2.png',
            collidable: false,
            width: 280,
            height: 320
        },
        tree3: {
            src: 'Tree_3.png',
            collidable: false,
            width: 280,
            height: 280
        }
    };

    this.setType = function(type)
    {
        if (undefined !== this.backgroundTypes[type]){
            this.background = new Image();
            this.background.src = this.baseUrl + this.backgroundTypes[type].src;
            this.H = this.backgroundTypes[type].height;
            this.W = this.backgroundTypes[type].width;
            this.collidable = this.backgroundTypes[type].collidable;
        }
        return this;
    };

    return this;
};

// inherit from Tile
BaseObject.prototype = Tile.prototype;
BaseObject.prototype.constructor = BaseObject;