/**
 * fallback shizzle if there is no support
 */
(function() {
    var lastTime = 0,
        vendors = ['webkit', 'moz'];

    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
            window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime(),
                timeToCall = Math.max(0, 16 - (currTime - lastTime)),
                id = window.setTimeout(function() { callback(currTime + timeToCall); },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());


const Cycle = function(scope){
    this.scope = scope;
    this.interval = undefined;
    this.drawLoop = function(){};
    this.logicLoop = function(){};
    this.logicDelta = new Date().getTime();
    this.delta = undefined;
    this.currentFps = undefined;

    // current fps
    this.fpsCounter = document.getElementById('fps');
    this.frames = 0;
    this.fpsDelta = new Date().getTime();
    this.showFps = true;
};

Cycle.prototype.setLogicLoop = function(fn){
    if ('function' == typeof fn){
        this.logicLoop = fn;
    } else {
        console.log(fn + ' is not a function!')
    }
};

Cycle.prototype.setDrawLoop = function(fn){
    if ('function' == typeof fn){
        this.drawLoop = fn;
    } else {
        console.log(fn + ' is not a function!')
    }
};

Cycle.prototype.start = function(){
    const me = this;

    this.interval = window.requestAnimationFrame(function(time){
        if (!this.delta)
        {
            this.delta = time;
        }
        else
        {
            this.delta = time - this.delta;
        }

        // fps for performance tracking here
        if(me.showFps){
            me.frames++;
            if (new Date().getTime() - me.fpsDelta > 500 )
            {
                me.currentFps = (me.frames * 2);
                me.fpsCounter.innerHTML = 'fps: '+ me.currentFps + ' delta: ' + (Math.round(this.delta*100)/100)+'ms';
                me.fpsDelta = new Date().getTime();
                me.frames = 0;
            }
        }

        if (new Date().getTime() - me.logicDelta > 50 ) {
            me.logicLoop.call(me.scope, (this.delta/1000));
        }

        me.drawLoop.call(me.scope, (this.delta/1000));
        this.delta = time;
        me.start.call(me);
    });
};

Cycle.prototype.stop = function(){
    window.cancelAnimationFrame(this.interval);
};