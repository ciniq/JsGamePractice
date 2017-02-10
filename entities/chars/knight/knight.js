const Knight = function(){
    Rect.apply(this, arguments);

    this.W = 0;
    this.H = 0;
    this.background = 'red';
    this.animationSpeed = 2;
    this.type = 'char';
    this.currentImage = 0;
    this.collissionType = 'square';
    this.baseImgDir = 'entities/chars/knight/assets/';
    this.isJumping = false;
    this.canJump = true;

    this.animationGrid = {
        idleRight: {
            src     : ['Idle_5.png','Idle_6.png','Idle_7.png','Idle_8.png','Idle_9.png','Idle_10.png','Idle_1.png','Idle_2.png','Idle_3.png','Idle_4.png'],
            offsetX : 4,
            offsetY : 3,
            offsetW : 10,
            offsetH : 8
        },
        idleLeft: {
            src     : ['Idle_5_l.png','Idle_6_l.png','Idle_7_l.png','Idle_8_l.png','Idle_9_l.png','Idle_10_l.png','Idle_1_l.png','Idle_2_l.png','Idle_3_l.png','Idle_4_l.png'],
            offsetX : 8,
            offsetY : 3,
            offsetW : 9,
            offsetH : 8
        },
        runRight: {
            src     : ['Run_5.png','Run_6.png','Run_7.png','Run_8.png','Run_9.png','Run_10.png','Run_1.png','Run_2.png','Run_3.png','Run_4.png'],
            offsetX : 1,
            offsetY : 2,
            offsetW : 8,
            offsetH : 6
        },
        runLeft: {
            src     : ['Run_5_l.png','Run_6_l.png','Run_7_l.png','Run_8_l.png','Run_9_l.png','Run_10_l.png','Run_1_l.png','Run_2_l.png','Run_3_l.png','Run_4_l.png'],
            offsetX : 6,
            offsetY : 2,
            offsetW : 6,
            offsetH : 6
        },
        jumpRight: {
            src     : ['Jump_5.png','Jump_6.png','Jump_7.png','Jump_8.png','Jump_9.png','Jump_10.png','Jump_1.png','Jump_2.png','Jump_3.png','Jump_4.png'],
            offsetX : 1,
            offsetY : 2,
            offsetW : 8,
            offsetH : 6
        },
        jumpLeft: {
            src     : ['Jump_5_l.png','Jump_6_l.png','Jump_7_l.png','Jump_8_l.png','Jump_9_l.png','Jump_10_l.png','Jump_1_l.png','Jump_2_l.png','Jump_3_l.png','Jump_4_l.png'],
            offsetX : 6,
            offsetY : 1,
            offsetW : 8,
            offsetH : 6
        }
    };

    for(let x in this.animationGrid){
        if (this.animationGrid.hasOwnProperty(x)){
            for (let i = 0 ; i < this.animationGrid[x].src.length; i++)
            {
                let src = this.baseImgDir+this.animationGrid[x].src[i];
                this.animationGrid[x].src[i] = new Image();
                this.animationGrid[x].src[i].src = src;
            }
        }
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
        this.X += Math.round((this.dirX ? this.VX : 0-this.VX)*delta);
        this.Y += Math.round((this.dirY ? this.VY : 0-this.VY)*delta);
    };

    this.draw = function(){

        var animationKey = 'idle',
            bg = null;
        if (this.isJumping){
            animationKey = 'jump'
            if (this.VX == 0)
            {
                this.currentImage = 4;
            }
        }else if(this.VX > 0) {
            animationKey = 'run'
        }

        animationKey += (this.dirX ? 'Right' : 'Left')

        bg = this.animationGrid[animationKey];
        this.ctx.drawImage(bg.src[Math.floor(this.currentImage++/this.animationSpeed)], bg.offsetX, bg.offsetY, (this.W - bg.offsetW), (this.H-bg.offsetH), this.X, this.Y, this.W, this.H);

        if (this.currentImage == ((this.animationGrid[animationKey].src.length - 1) * this.animationSpeed))
        {
            this.currentImage = 0;
        }
        return this;
    };

    this.resolveCollision = function() {
        for (let i in this.collisionEntities)
        {
            if(this.collisionEntities.hasOwnProperty(i))
            {
                if (
                    this.getBoxBottom() >= this.collisionEntities[i].getBoxTop() &&
                    this.getBoxTop() < this.collisionEntities[i].getBoxTop() &&
                    this.getCentre().y < this.collisionEntities[i].getBoxTop()
                ) {
                    if(this.dirY)
                    {
                        this.Y = this.collisionEntities[i].getBoxTop() - this.H;
                        this.AY = 0;
                        this.canJump = true;
                    }
                    this.isJumping = false;
                    this.dirY = true;
                } else if (
                    this.getBoxTop() < this.collisionEntities[i].getBoxBottom() &&
                    this.getBoxBottom() > this.collisionEntities[i].getBoxBottom() &&
                    this.getCentre().y > this.collisionEntities[i].getBoxBottom()
                ) {
                    // stop the jump, and start falling
                    this.Y = this.collisionEntities[i].getBoxBottom();
                    this.AY = 0;
                    this.dirY = true;
                    this.isJumping = false;

                } else if (
                    this.getBoxRight() >= this.collisionEntities[i].getBoxLeft() &&
                    this.getBoxLeft() < this.collisionEntities[i].getBoxLeft() &&
                    this.getCentre().x < this.collisionEntities[i].getBoxLeft()
                ) {

                    this.X = this.collisionEntities[i].getBoxLeft() - this.W -1;
                    this.AX = 0;
                } else if (
                    this.getBoxLeft() <= this.collisionEntities[i].getBoxRight() &&
                    this.getBoxRight() > this.collisionEntities[i].getBoxRight() &&
                    this.getCentre().x > this.collisionEntities[i].getBoxRight()
                ) {
                    this.X = this.collisionEntities[i].getBoxRight() +1;
                    this.AX = 0
                }
            }
        }
        this.collisionEntities = [];
        this.collide = false;
    };

    this.handleInput = function(buttons) {
        if ((buttons.Space || buttons.KeyW) && !this.isJumping && this.canJump)
        {
            this.AY = 3;
            this.dirY = false;
            this.isJumping = true;
            this.canJump = false;
        }

        if(buttons.KeyA || buttons.KeyD) {
            this.AX = 1;
            this.dirX = buttons.KeyD;
        }

        return this;
    };

    this.applyGravity = function() {
        if (this.AY > 0 && !this.dirY) {
            this.AY -= 0.2;
            if(this.AY <= 0)
            {
                this.AY = 0;
                this.dirY = true;
            }
        }
        else if (this.AY < 2 && this.dirY) {
            this.AY += 0.5;
        }
    };
};

// inherit from characterBase
Knight.prototype = Rect.prototype;
Knight.prototype.constructor = Knight;