export class Canvas{
    constructor(canvasEl, width, height){
        this.canvas = canvasEl;
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = width;
        this.canvas.height = height;
        this.x = 0;
        this.y = 0;
    }

    setTranslate(translateX, translateY){
        this.ctx.translate(translateX, translateY);
        this.x = translateX;
        this.y = translateY;
    }

    drawArc(color, radius, startAngle, endAngle){
        this.ctx.save();
        this.ctx.lineCap = 'round';
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 20;

        this.ctx.beginPath();
        this.ctx.arc(0, 0, radius, startAngle, endAngle, false);
        this.ctx.stroke();

        this.ctx.restore();
    }

    clear(){
        this.ctx.clearRect(-this.x, -this.y, this.canvas.width, this.canvas.height);
    }
}