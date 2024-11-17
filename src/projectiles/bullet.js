export default class Bullet {
    
    constructor(args){
        this.velocity = args.velocity ?? 800;
        this.width = args.width ?? 5;
        this.height = args.height ?? 5;
        this.direction = args.direction ?? args.entity.direction;
        this.set_initial_position(args);
    }

    set_initial_position(args){

        if( typeof args.position !== 'undefined' ) {
            this.position = args.position;
            return;
        }
        
        let {x, y} = args.entity.barrel.coordinates;

        const barrel_width = args.entity.barrel.coordinates.w;
        const barrel_height = args.entity.barrel.coordinates.h;
        
        if( this.direction === 'right' ) {
            x += barrel_width;
            y += barrel_height/2 - this.width/2;
        }
        else if( this.direction === 'left' ) {
            x -= this.width;
            y += barrel_height/2 - this.width/2;
        }
        else if( this.direction === 'up' ) {
            x += barrel_width/2 - this.width/2;
            y -= this.height;
        }
        else if( this.direction === 'down' ) {
            x += barrel_width/2 - this.height/2;
            y += barrel_height;
        }
        
        this.position = { x, y }
    }

    update(time){
        
        let velocity = this.velocity * time.seconds_passed;

        if( this.direction === 'right' ) {
            this.position.x += velocity;
        }
        else if( this.direction === 'left' ) {
            this.position.x -= velocity;
        }
        else if( this.direction === 'up' ) {
            this.position.y -= velocity;
        }
        else if( this.direction === 'down' ) {
            this.position.y += velocity;
        }

    }

    draw(ctx){
        ctx.save();
        ctx.strokeStyle = 'cyan';
        let {x, y} = this.position;
        ctx.strokeRect(x, y, this.width, this.height);
        ctx.restore();
    }
}