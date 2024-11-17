import { apply_bounds } from 'components/bounds';
import { add_deceleration } from './deceleration';

export function add_movement(entity) {
    
    entity.move_speed = 300;
    entity.direction = 'right';

    // entity.hooks.on_move_up = [];
    // entity.hooks.on_move_down = [];
    // entity.hooks.on_move_left = [];
    // entity.hooks.on_move_right = [];

    entity.move_up = ()=>{
        entity.direction = 'up';
        entity.decelerate.y = false;
        entity.velocity.y = -entity.move_speed;
    }
    entity.move_down = ()=>{
        entity.direction = 'down';
        entity.decelerate.y = false;
        entity.velocity.y = entity.move_speed;
    }

    entity.move_left = ()=>{
        entity.direction = 'left';
        entity.decelerate.x = false;
        entity.velocity.x = -entity.move_speed;
    }
    entity.move_right = ()=>{
        entity.direction = 'right';
        entity.decelerate.x = false;
        entity.velocity.x = entity.move_speed;
    }

    entity.move_y_stop = ()=>{
        entity.decelerate.y = true;
    }
    entity.move_x_stop = ()=>{
        entity.decelerate.x = true;
    }

    function draw(ctx){
        ctx.strokeRect(entity.position.x, entity.position.y, entity.width, entity.height);
    }

    function update(time){
        movement_update(time)
    }
    
    function movement_update(time){
        entity.position.x += entity.velocity.x * time.seconds_passed;
        entity.position.y += entity.velocity.y * time.seconds_passed;
    }

    entity.hooks.draw.push(draw);
    entity.hooks.update.push(update);
    apply_bounds(entity)
    add_deceleration(entity)
}