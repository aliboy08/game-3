import Player from './player/player';

const frame_time = {
    previous: 0,
    seconds_passed: 0,
}

let canvas;
let ctx;
let entities = [];

function init(){
    init_canvas();
    init_game();
    requestAnimationFrame(frame);
}
window.addEventListener('load', init);

function init_game(){
    entities.push(new Player('P1', ctx))
}

function update(time){
    entities.forEach(entity=>entity.update(time));
}

function draw(ctx){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    entities.forEach(entity=>entity.draw(ctx));
}

function init_canvas(){
    canvas = document.querySelector('canvas');
    canvas.width = 1000;
    canvas.height = 500;
    
    ctx = canvas.getContext('2d');
    
    ctx.strokeStyle = "green";
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
}

function frame(time){
    // for consistent fps on different refresh rates
    frame_time.seconds_passed = (time - frame_time.previous) / 1000;
    frame_time.previous = time;
    update(frame_time);
    draw(ctx);
    requestAnimationFrame(frame);
}