import {Painter} from './painter.js'

const resize = (canvas, ctx) => {
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    ctx.scale(1,1);
}

window.onload = () => {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    resize(canvas, ctx);

    const painter = new Painter();
    painter.setRadius(24);

    let flag = false;

    canvas.addEventListener('mousedown', function(e){
        painter.paint(ctx, e.clientX, e.clientY);
        flag = true;
    });

    canvas.addEventListener('mouseup', function(){
        flag = false;
    });

    canvas.addEventListener('mousemove', function(e){
        if(!flag){
            return;
        } else{
            painter.paint(ctx, e.clientX, e.clientY);
        }
    });

    window.addEventListener('mousemove', function(e){
        const doraemon = document.querySelector('.image-wrapper');
        doraemon.style.top = `${e.clientY -70}px`;
        doraemon.style.left = `${e.clientX -100}px`;
    });

    window.addEventListener('resize', function(){
        resize(canvas, ctx);
    });

}

