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
    },

    createId : function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
};