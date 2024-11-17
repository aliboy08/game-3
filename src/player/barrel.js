export function add_barrel(entity){

    const width = 8;
    const height = 16;
    const set_direction = { up, down, left,  right }

    let coordinates = { x: 0, y: 0, w: 0, h: 0 }

    function up(){
        coordinates.x = entity.position.x + (entity.width/2) - (width/2);
        coordinates.y = entity.position.y - height;
        coordinates.w = width;
        coordinates.h = height;
    }

    function down(){
        coordinates.x = entity.position.x + (entity.width/2) - (width/2);
        coordinates.y = entity.position.y + entity.height;
        coordinates.w = width;
        coordinates.h = height;
    }

    function left(){
        coordinates.x = entity.position.x - height;
        coordinates.y = entity.position.y + (entity.height/2) - (width/2);
        coordinates.w = height;
        coordinates.h = width;
    }

    function right(){
        coordinates.x = entity.position.x + entity.width;
        coordinates.y = entity.position.y + (entity.height/2) - (width/2);
        coordinates.w = height;
        coordinates.h = width;
    }

    function update(){
        set_direction[entity.direction]();
    }

    function draw(ctx){
        ctx.save();
        ctx.strokeStyle = 'lightgreen';
        let {x, y, w, h} = coordinates;
        ctx.strokeRect(x, y, w, h);
        ctx.restore();
    }

    entity.barrel = { coordinates };
    entity.hooks.update.push(update);
    entity.hooks.draw.push(draw);
}