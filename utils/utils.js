const Utils = {
    createEl : function(parentEl, type, css){
        let el = document.createElement(type);
        if (css){
            this.css(el, css);
        }
        parentEl.appendChild(el);
        return el;
    },

    css : function(el, css){
        for (let i in css){
            if (css.hasOwnProperty(i)){
                el.style[i] = css[i];
            }
        }
        return el;
    }
};