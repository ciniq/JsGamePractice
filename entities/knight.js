const Knight = function(){
    EntityBase.apply(this, arguments);

    this.W = 0;
    this.H = 0;
    this.background = 'red';
    this.animationSpeed = 2;
    this.type = 'char';
    this.currentImage = 0;
    this.collissionType = 'square';
    this.baseImgDir = 'entities/assets/characters/knight/png/';
    this.isJumping = false;

    this.animationGrid = {
        run: [
            'Run_5.png',
            'Run_6.png',
            'Run_7.png',
            'Run_8.png',
            'Run_9.png',
            'Run_10.png',
            'Run_1.png',
            'Run_2.png',
            'Run_3.png',
            'Run_4.png'
        ]
    };

    for (let i = 0 ; i < this.animationGrid.run.length; i++)
    {
        let src = this.baseImgDir+this.animationGrid.run[i];
        this.animationGrid.run[i] = new Image();
        this.animationGrid.run[i].src = src;
    }

    this.updatePosition = function(delta) {
        if (this.AX >= 0)
        {
            this.AX -= 0.1;
            if (this.AX <= 0)
            {
                this.AX = 0;
            }
        }

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
                    this.collisionEntities[i].getBoxRight() > this.getBoxLeft() &&
                    this.collisionEntities[i].getBoxLeft() < this.getBoxRight() &&
                    this.dirY
                ) {
                    if(!minY || minY > this.collisionEntities[i].getBoxTop())
                    {
                        this.isJumping = false;
                        minY = this.collisionEntities[i].getBoxTop();
                    }
                }
                // boven
                else if (
                    this.collisionEntities[i].getBoxBottom() < this.getBoxBottom() &&
                    this.collisionEntities[i].getBoxTop() < this.getBoxBottom() &&
                    !this.dirY
                ) {
                    console.log('boven');
                    this.AY = 0;
                    this.dirY = true;
                }

                // rechts
                if (
                    this.collisionEntities[i].getBoxRight() > this.getBoxLeft() &&
                    this.collisionEntities[i].getBoxLeft() > this.getBoxLeft() &&
                    this.dirX
                ) {
                    console.log('rechts');
                    this.AX = 0;
                    this.X = this.collisionEntities[i].getBoxLeft() - this.W;
                    this.dirY = true;
                }

                // links
                else if (
                    this.collisionEntities[i].getBoxLeft() < this.getBoxRight() &&
                    this.collisionEntities[i].getBoxRight() < this.getBoxRight() &&
                    !this.dirX
                ) {
                    console.log('links');
                    this.AX = 0;
                    this.X = this.collisionEntities[i].getBoxRight()
                    this.dirY = true;
                }
            }
        }
        this.collisionEntities = [];
        if(undefined !== minY)
        {
            this.Y = minY - this.H;
        }
        this.collide = false;
    };

    this.handleInput = function(buttons) {
        if ((buttons.Space || buttons.KeyW) && !this.isJumping)
        {
            this.AY = 3;
            this.dirY = false;
            this.isJumping = true;
        }

        if(buttons.KeyA || buttons.KeyD) {
            this.AX = 1;
            this.dirX = buttons.KeyD;
        }

        return this;
    }
};

// inherit from characterBase
Knight.prototype = Rect.prototype;
Knight.prototype.constructor = Knight;

Knight.prototype.applyGravity = function() {
    if (this.AY > 0 && !this.dirY) {
        this.AY -= 0.2;
        if(this.AY <= 0)
        {
            this.AY = 0;
            this.dirY = true;
        }
    }
    else if (this.AY < 1.5 && this.dirY) {
        this.AY += 0.5;
    }
};