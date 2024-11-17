export function add_deceleration(entity) {

    const decelerate = {
        rate: 2000,
        y: false,
        x: false,
    };

    entity.decelerate = decelerate;

    function update(time){
        decelerate_x_update(time)
        decelerate_y_update(time)
    }
    
    function decelerate_x_update(time){
        if( !decelerate.x ) return;
        if( entity.velocity.x === 0 ) return;
        
        if( entity.velocity.x > 0 ) {
            entity.velocity.x -= decelerate.rate * time.seconds_passed;
            if( entity.velocity.x < 0 ) {
                entity.velocity.x = 0;
            }
        }
        else {
            entity.velocity.x += decelerate.rate * time.seconds_passed;
            if( entity.velocity.x > 0 ) {
                entity.velocity.x = 0;
            }
        }
    }

    function decelerate_y_update(time){
        if( !decelerate.y ) return;
        if( entity.velocity.y === 0 ) return;
        
        if( entity.velocity.y > 0 ) {
            entity.velocity.y -= decelerate.rate * time.seconds_passed;
            if( entity.velocity.y < 0 ) {
                entity.velocity.y = 0;
            }
        }
        else {
            entity.velocity.y += decelerate.rate * time.seconds_passed;
            if( entity.velocity.y > 0 ) {
                entity.velocity.y = 0;
            }
        }
    }

    entity.hooks.update.push(update);
}