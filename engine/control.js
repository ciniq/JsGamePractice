const Control = function()
{
    var  me = this;

    this.buttons = {
        KeyW : false,
        KeyA : false,
        KeyS : false,
        KeyD : false,
        Space: false
    };

    this.handle = function(buttons){};

    document.body.addEventListener('keydown', function(e) {
        if (undefined !== me.buttons[e.code]) {
            me.buttons[e.code] = true;
        }
        me.handleDirection();
    });

    document.body.addEventListener('keyup', function(e) {
        if (undefined !== me.buttons[e.code]) {
            me.buttons[e.code] = false;
        }
        me.handleDirection();
    });

    this.handleDirection = function(){
        this.handle.call(this, me.buttons);
    };
};