export function apply_bounds(entity){

    const canvas = entity.ctx.canvas;

    function update(){

        let bounds_right = canvas.width - entity.width;
        let bounds_bottom = canvas.height - entity.height;

        // left
        if( entity.position.x < 0 ) {
            entity.position.x = 0;
        }
        // right
        else if ( entity.position.x > bounds_right ) {
            entity.position.x = bounds_right;
        }

        // up
        if( entity.position.y < 0 ) {
            entity.position.y = 0;
        }
        else if( entity.position.y > bounds_bottom ) {
            entity.position.y = bounds_bottom;
        }
        
    }
    
    entity.hooks.update.push(update);
}