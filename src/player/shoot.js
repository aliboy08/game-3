import Bullet from 'src/projectiles/bullet';
import Laser from 'src/projectiles/laser';

export function add_shoot(entity){

    let boundary = {
        top: 0,
        bottom: entity.ctx.canvas.height,
        right: entity.ctx.canvas.width,
        left: 0,
    }

    let projectiles = [];
    let lasers = [];
    let laser_pause = false;
    
    entity.shoot_bullet = ()=>{
        projectiles.push(new Bullet({entity}));
    }

    entity.shoot_laser = ()=>{

        if( laser_pause ) return;
        laser_pause = true;
        
        const laser = new Laser({entity});
        laser.on_complete = ()=>{
            remove(laser, lasers);
            laser_pause = false;
        };
        lasers.push(laser);
    }
    
    function clean_up_projectiles(projectile){
        if( projectile.position.x < boundary.left ||
            projectile.position.x > boundary.right ||
            projectile.position.y < boundary.top ||
            projectile.position.y > boundary.bottom ) {
            remove(projectile, projectiles);
        }
    }

    function remove(item, group){
        group.splice(group.indexOf(item), 1);
    }

    function update(time){

        projectiles.forEach(projectile=>{
            projectile.update(time);
            clean_up_projectiles(projectile)
        })

        lasers.forEach(laser=>{
            laser.update(time);
        })
    }

    function draw(ctx){
        projectiles.forEach(projectile=>{
            projectile.draw(ctx);
        })

        lasers.forEach(laser=>{
            laser.draw(ctx);
        })
    }

    entity.hooks.update.push(update);
    entity.hooks.draw.push(draw);
}