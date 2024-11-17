import Projectile from './projectile';

export function add_shoot(entity){

    let boundary = {
        top: 0,
        bottom: entity.ctx.canvas.height,
        right: entity.ctx.canvas.width,
        left: 0,
    }

    let projectiles = [];

    entity.shoot = ()=>{
        projectiles.push(new Projectile({entity}));
    }
    
    function check_boundary(projectile){
        if( projectile.position.x < boundary.left ||
            projectile.position.x > boundary.right ||
            projectile.position.y < boundary.top ||
            projectile.position.y > boundary.bottom ) {
            remove(projectile);
        }
    }

    function remove(projectile){
        projectiles.splice(projectiles.indexOf(projectile), 1);
    }

    function update(time){
        projectiles.forEach(projectile=>{
            projectile.update(time);
            check_boundary(projectile)
        })
    }

    function draw(ctx){
        projectiles.forEach(projectile=>{
            projectile.draw(ctx);
        })
    }

    entity.hooks.update.push(update);
    entity.hooks.draw.push(draw);
}