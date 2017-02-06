const Knight = function(){
    EntityBase.apply(this, arguments);

    this.W = 0;
    this.H = 0;
    this.background = 'red';
    this.animationSpeed = 5;
    this.type = 'char';
    this.currentImage = 0;
    this.collissionType = 'square';

    this.Xstarted = false;
    this.animationGrid = {
        run: [

            'entities/assets/characters/knight/png/Run_5.png',
            'entities/assets/characters/knight/png/Run_6.png',
            'entities/assets/characters/knight/png/Run_7.png',
            'entities/assets/characters/knight/png/Run_8.png',
            'entities/assets/characters/knight/png/Run_9.png',
            'entities/assets/characters/knight/png/Run_10.png',
            'entities/assets/characters/knight/png/Run_1.png',
            'entities/assets/characters/knight/png/Run_2.png',
            'entities/assets/characters/knight/png/Run_3.png',
            'entities/assets/characters/knight/png/Run_4.png',
        ]
    };

    for (let i = 0 ; i < this.animationGrid.run.length; i++)
    {
        let src = this.animationGrid.run[i];
        this.animationGrid.run[i] = new Image();
        this.animationGrid.run[i].src = src;
    }

    this.updatePosition = function(delta){

        this.dirY = true;
        this.AY = 1;

        // calculate the speed
        this.VX = this.AX*this.VXmax;
        this.VY = this.AY*this.VYmax;

        // Distance = speed * delta
        this.X += ((this.dirX ? this.VX : 0-this.VX)*delta);
        this.Y += ((this.dirY ? this.VY : 0-this.VY)*delta);
    };

    this.setDimensions = function(width, height) {
        this.W = width;
        this.H = height;
        return this;
    };

    this.draw = function(){

        this.ctx.drawImage(this.animationGrid.run[Math.floor(this.currentImage++/this.animationSpeed)], this.X, this.Y, this.W, this.H);

        if (this.currentImage == ((this.animationGrid.run.length - 1) * this.animationSpeed))
        {
            this.currentImage = 0;
        }
        return this;
    };

    this.resolveCollision = function() {
        var minY = undefined;

        for (let i in this.collisionEntities)
        {
            if(this.collisionEntities.hasOwnProperty(i))
            {
                // onder
                if (
                    this.collisionEntities[i].getBoxTop() > this.getBoxTop() &&
                    this.collisionEntities[i].getBoxBottom() > this.getBoxTop() &&
                    this.AY > 0
                ) {
                    if(!minY || minY > this.collisionEntities[i].getBoxTop())
                    {
                        minY = this.collisionEntities[i].getBoxTop();
                        if(! this.Xstarted)
                        {
                            this.AX = 0.5;
                            this.dirX = true;
                            this.Xstarted = true;
                        }
                    }
                }// boven
                else if (
                    this.collisionEntities[i].getBoxBottom() < this.getBoxBottom() &&
                    this.collisionEntities[i].getBoxTop() < this.getBoxBottom() &&
                    this.AY < 0
                ) {
                    // this.vector.Y = Math.abs(this.vector.Y);
                }// rechts
                if (
                    this.collisionEntities[i].getBoxRight() > this.getBoxLeft() &&
                    this.collisionEntities[i].getBoxLeft() > this.getBoxLeft()&&
                    this.AX > 0
                ) {
                    this.dirX = false;
                }// links
                else if (
                    this.collisionEntities[i].getBoxLeft() < this.getBoxRight() &&
                    this.collisionEntities[i].getBoxRight() < this.getBoxRight() &&
                    this.AX > 0
                ) {
                    this.dirX = true;
                }
            }
        }
        this.collisionEntities = [];
        this.Y = minY - this.H;
        this.collide = false;
    };
};

// inherit from characterBase
Knight.prototype = Rect.prototype;
Knight.prototype.constructor = Knight;