export class Canvas{
    private canvasEl: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private width: number;
    private height: number;
    private backgroundColor: string;

    constructor(canvasEl: HTMLCanvasElement){
        this.canvasEl = canvasEl;
        this.context = this.canvasEl.getContext('2d');
        this.width = 0;
        this.height = 0;
        this.backgroundColor = '';

        window.addEventListener('resize', () => {
            this.resize();
        });
    }

    setSize(width: number, height:number){
        this.width = width;
        this.height = height;
        this.canvasEl.width = width;
        this.canvasEl.height = height; 
    }

    setBackgroundColor(color: string){
        this.backgroundColor = color;
        this.canvasEl.style.backgroundColor = color;
    }

    resize(){
        this.width = document.body.clientWidth;
        this.height = document.body.clientHeight;
        this.canvasEl.width = this.width;
        this.canvasEl.height = this.height;
        this.context.scale(1,1);
    }

    strokeCurve(color: string, repeatX: number, repeatY: number){
        this.context.strokeStyle = color;
        this.context.lineWidth = 2;
        this.context.lineCap = 'round';
        this.context.beginPath();
        this.context.moveTo(0, 0);

        //길이를 같게 하려면 일단 2배씩 늘리기.
        //자연스러운 커브 -> x나 y중 하나로 비틀기.
        //추가적인 곡선을 100,100과 200,200, 그러니까 100길이를 하나의 단위로 찍는다고 한다면 모든 좌표에서 +100후 x좌표 변곡점 2개를 조절해서 기울기조절.
        //(+0 ~ +50)정도 괜찮아보임. 첫번째는 양으로, 두번째는 음으로. 반대로 갈 시 꺾여서 이상한 모양이 나온다.
        const randomGradient = Math.random() * 50;
        const initCurvePoint1 = repeatX/2;
        const initCurvePoint2 = repeatX/2;
        this.context.bezierCurveTo(initCurvePoint1, 0, initCurvePoint2, repeatY, repeatX, repeatY);

        const nextCurvePoint1 = initCurvePoint1 + repeatX + randomGradient;
        const nextCurvePoint2 = initCurvePoint2 + repeatX - randomGradient;
        this.context.bezierCurveTo( nextCurvePoint1, 0+repeatY, nextCurvePoint2, (repeatY+repeatY), (repeatX+repeatX), (repeatY+repeatY) );
        this.context.stroke();
        // window.requestAnimationFrame.bind(this.strokeCurve('black', 50, 50));
    }
}