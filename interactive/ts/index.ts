import {Canvas} from './canvas'

window.onload = () => {
    const canvasEl = document.querySelector('canvas');
    const canvas = new Canvas(canvasEl);

    
    const bodyWidth = document.body.clientWidth;
    const bodyHeight = document.body.clientHeight;

    canvas.setSize(bodyWidth, bodyHeight);
    canvas.setBackgroundColor('gray');
    canvas.strokeCurve('black', 100, 100);
}