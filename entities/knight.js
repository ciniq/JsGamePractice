const Knight = function(){
    EntityBase.apply(this, arguments);

    this.W = 0;
    this.H = 0;
    this.background = 'red';

    this.animationGrid = {
        idle: [
            'entities/assets/characters/knight/png/Idle (1).png',
            'entities/assets/characters/knight/png/Idle (2).png',
            'entities/assets/characters/knight/png/Idle (3).png',
            'entities/assets/characters/knight/png/Idle (4).png',
            'entities/assets/characters/knight/png/Idle (5).png',
            'entities/assets/characters/knight/png/Idle (6).png',
            'entities/assets/characters/knight/png/Idle (7).png',
            'entities/assets/characters/knight/png/Idle (8).png',
            'entities/assets/characters/knight/png/Idle (9).png',
            'entities/assets/characters/knight/png/Idle (10).png'
        ]
    };

    this.currentImage = 0;

    this.collissionType = 'square';
    this.img = new Image();
    this.img.src = this.animationGrid.idle[9];

    this.setDimensions = function(width, height) {
        this.W = width;
        this.H = height;
        return this;
    };

    this.draw = function(){

        this.img.scr = this.animationGrid.idle[Math.floor(this.currentImage++/10)];
        //
        console.log(this.animationGrid.idle[Math.floor(this.currentImage++/10)])
        this.ctx.drawImage(this.img, this.X, this.Y, this.W, this.H);

        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(this.X, this.Y, this.W, this.H);

        if (this.currentImage == ((this.animationGrid.idle.length - 1) * 10))
        {
            this.currentImage = 0;
        }
        return this;
    };

    this.resolveCollision = function() {
        if (this.collide && this.background == 'red')
        {
            var me = this;
            this.background = 'yellow';
            setTimeout(function(){me.background = 'red'}, 500);
        }
        this.collide = false;
    };
};

// inherit from characterBase
Knight.prototype = Rect.prototype;
Knight.prototype.constructor = Knight;