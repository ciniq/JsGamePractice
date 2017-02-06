Const Control = function()
{
    var direction = null,
        jump = undefined,
        me = this;

    this.KeyA_pressed = false;
    this.KeyD_pressed = false;
    this.KeyW_pressed = false;
    this.KeyS_pressed = false;

    this.handle = function(d, j){};

    document.body.addEventListener('keydown', function(e){
        if(undefined !== me[e.code+'_pressed']){
            me[e.code+'_pressed'] = true;
        }
        me.handleDirection();
    });

    document.body.addEventListener('keyup', function(e){
        if(undefined !== me[e.code+'_pressed']){
            me[e.code+'_pressed'] = false;
        }
        me.handleDirection();
    });

    this.handleDirection = function(){
        jump = false;

        if (this.KeyA_pressed && !this.KeyD_pressed){
            direction = 'left';
        }
        else if (!this.KeyA_pressed && this.KeyD_pressed){
            direction = 'right';
        }
        else if (!this.KeyS_pressed && this.KeyW_pressed){
            direction = 'up';
            jump = true;
        }
        else if (this.KeyS_pressed && !this.KeyW_pressed){
            direction = 'down';
        }
        else {
            direction = null;
        }

        this.handle.call(this, direction, jump);
    };
};