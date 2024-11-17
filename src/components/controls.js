const actions = {
    P1: {
        KeyW: 'move_up',
        KeyS: 'move_down',
        KeyA: 'move_left',
        KeyD: 'move_right',
        KeyJ: 'shoot_bullet',
        KeyK: 'shoot_laser',
    },
}

export function add_controls(entity) {
    
    const pressing = {}

    const actions_end = {
        
        move_up: ()=>{

            entity.move_y_stop();

            if( pressing.move_down ) {
                entity.move_down();
            }
        },
        move_down: ()=>{

            entity.move_y_stop();

            if( pressing.move_up ) {
                entity.move_up();
            }
        },
        move_left: ()=>{

            entity.move_x_stop();

            if( pressing.move_right ) {
                entity.move_right();
            }
        },
        move_right: ()=>{

            entity.move_x_stop();

            if( pressing.move_left ) {
                entity.move_left();
            }
        }
    }
    
    document.addEventListener('keydown',e=>{
        if( !actions[entity.id] ) return;
        const action_key = actions[entity.id][e.code];
        pressing[action_key] = true;
        if( typeof entity[action_key] === 'function' ) {
            entity[action_key]();
        }
    })

    document.addEventListener('keyup',(e)=>{
        const action_key = actions[entity.id][e.code];
        pressing[action_key] = false;
        if( typeof actions_end[action_key] === 'function' ) {
            actions_end[action_key]();
            // console.log('end', action_key, pressing)
        }
    });
}