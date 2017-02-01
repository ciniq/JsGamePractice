const Collision = {
    AABB_quad_notGreedy: function(item, context){
        return (
            item.getBoxRight() > context.X &&
            item.getBoxTop() > context.Y &&
            item.getBoxLeft() < (context.W + context.X) &&
            item.getBoxBottom() < (context.H + context.Y)
        );
    },

    AABB_quad_greedy: function(item, context){
        // check if the vertical
        if(
            (item.getBoxTop() > context.Y && item.getBoxTop() < (context.H + context.Y)) ||
            (item.getBoxBottom() < (context.H + context.Y) && item.getBoxBottom() > context.Y) ||
            (item.getBoxTop() < context.Y && item.getBoxBottom() > (context.H + context.Y))
        ) {

            // check horizontal placement
            if (
                (item.getBoxRight() > context.X && item.getBoxRight() < (context.W + context.X)) ||
                (item.getBoxLeft() < (context.W + context.X) && item.getBoxLeft() > context.X) ||
                (item.getBoxRight() > context.X && item.getBoxLeft() < (context.W + context.X))
            ) {

                return true;
            }
        }

        return false;
    },

    collision: function(item1, item2) {
        if(item1.collissionType === 'circle') {
            if(item2.collissionType == 'circle') {
                return this.circle2circle(item1, item2);
            } else if (item2.collissionType == 'square') {
                return this.circle2square(item1, item2);
            }
        } else if (item1.collissionType == 'square') {
            if (item2.collissionType == 'circle') {
                return this.circle2square(item2, item1);
            } else if (item2.collissionType == 'square') {
                return this.box2box(item2, item2);
            }
        }
        return false;
    },

    circle2circle: function(circle1, circle2) {

        if (this.box2box(circle1, circle2))
        {
            var Xdiff = (circle1.X > circle2.X ? circle1.X - circle2.X : circle2.X - circle1.X),
                Ydiff = (circle1.Y > circle2.Y ? circle1.Y - circle2.Y : circle2.Y - circle1.Y),
                line = Math.sqrt(Math.pow(Xdiff, 2) + Math.pow(Ydiff, 2));

            if (line <= ((circle1.size/2) + (circle2.size/2)))
            {
                return true
            }
        }
        return false;
    },

    circle2square: function(circle, square) {

        // todo: refine this shit
        if (this.box2box(circle, square)) {

            return true;
        }

        return false;
    },

    box2box: function(square1, square2) {
        if(
            (square1.getBoxLeft() > square2.getBoxLeft() && square1.getBoxLeft() < square2.getBoxRight()) ||
            (square1.getBoxRight() < square2.getBoxRight() && square1.getBoxRight() > square2.getBoxLeft())
        ) {
             if(
                (square1.getBoxTop() > square2.getBoxTop() && square1.getBoxTop() < square2.getBoxBottom()) ||
                (square1.getBoxBottom() < square2.getBoxBottom() && square1.getBoxBottom() > square2.getBoxTop())
            ) {
                return true;
            }
        }
        return false;
    }
};