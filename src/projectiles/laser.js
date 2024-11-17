export default class Laser {
    
    constructor(args){
        this.velocity = args.velocity ?? 800;
        this.direction = args.direction ?? args.entity.direction;
        this.set_dimensions(args);
        this.set_initial_position(args);
        this.shrink_rate = args.shrink_rate ?? 20;
    }

    set_dimensions(args){

        let height = args.height ?? 800;
        
        if( this.direction === 'right' || this.direction === 'left' ) {
            this.width = height;
            this.height = args.entity.barrel.coordinates.h;
        }
        else if( this.direction === 'up' || this.direction === 'down' ) {
            this.width = args.entity.barrel.coordinates.w;
            this.height = height;
        }
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
            // x += barrel_width;
            x += barrel_width;
        }
        else if( this.direction === 'left' ) {
            // x -= this.width;
            x -= this.width;
        }
        else if( this.direction === 'up' ) {
            x += barrel_width/2 - this.width/2;
            y -= this.height;
        }
        else if( this.direction === 'down' ) {
            y += barrel_height;
        }
        
        this.position = { x, y }
    }

    update(time){

        let shrink = this.shrink_rate * time.seconds_passed;

        if( this.direction === 'right' || this.direction === 'left' ) {
            
            this.height -= shrink;
            this.position.y += shrink/2;
            
            if( this.height <= 0 ) {
                this.height = 0;
                if( typeof this.on_complete === 'function' ) {
                    this.on_complete(this);
                }
            }
        }
        else if ( this.direction === 'up' || this.direction === 'down') {
            
            this.width -= shrink;
            this.position.x += shrink/2;
            
            if( this.width <= 0 ) {
                this.width = 0;
                if( typeof this.on_complete === 'function' ) {
                    this.on_complete(this);
                }
            }
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