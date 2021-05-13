export class Painter{
    constructor(){
        this.radius = 32;
    }
    
    setRadius(radius = 32){
        this.radius = radius;
    }

    paint(ctx, x, y){
        ctx.beginPath();
        ctx.fillStyle = 'blue';
        ctx.arc(x, y, this.radius, 0, Math.PI*2, false);
        ctx.fill();
    }
}