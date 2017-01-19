const Utils = {
    createEl : function(parentEl, type, css){
        var el = document.createElement(type);
        if (css){
            this.css(el, css);
        }
        parentEl.appendChild(el);
        return el;
    },

    css : function(el, css){
        for (var i in css){
            if (css.hasOwnProperty(i)){
                el.style[i] = css[i];
            }
        }
        return el;
    }
};