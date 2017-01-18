const Physics = function(){
    this.gravity = 10;

    this.doGravity = function(x){
        return x + this.gravity;
    };
};