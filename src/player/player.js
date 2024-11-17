import { add_controls } from 'components/controls'
import { add_movement } from './movement'
import { add_barrel } from './barrel';
import { add_shoot } from './shoot';

export default class Player {

    constructor(id, ctx) {

        this.ctx = ctx;
        this.id = id;
        this.width = 30;
        this.height = 30;

        this.position = {
            x: 200,
            y: 200,
        }

        this.velocity = {
            x: 0,
            y: 0,
        }
        
        this.hooks = {
            update: [],
            draw: [],
        }

        add_movement(this)
        add_controls(this)
        add_barrel(this)
        add_shoot(this)
    }

    draw(ctx){
        this.hooks.draw.forEach(action=>action(ctx))
    }

    update(time){
        this.hooks.update.forEach(action=>action(time))
    }

}