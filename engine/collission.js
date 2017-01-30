const Collission = {
    AABB_notGreedy: function(item, context){
        return (
            item.getBoxRight() > context.X &&
            item.getBoxTop() > context.Y &&
            item.getBoxLeft() < (context.W + context.X) &&
            item.getBoxBottom() < (context.H + context.Y)
        );
    },

    AABB_greedy: function(item, context){
        // check if the vertical
        if(
            (item.getBoxTop() > context.Y && item.getBoxTop() < (context.H + context.Y)) ||
            (item.getBoxBottom() < (context.H + context.Y) && item.getBoxBottom() > context.Y)
        ) {
            // check horizontal placement
            if (
                (item.getBoxRight() > context.X && item.getBoxRight() < (context.W + context.X)) ||
                (item.getBoxLeft() < (context.W + context.X) && item.getBoxLeft() > context.X)
            ) {
                return true;
            }
        }
        return false;
    },

    colliding: function(item1, item2) {


    }
};