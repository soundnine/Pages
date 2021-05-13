function init(){
    clock();
    setInterval(clock, 1000);
}

function clock(){
    var now = new Date();
    var ctx = document.querySelector('#canvas').getContext('2d');
    ctx.save();
    ctx.clearRect(0, 0, 150, 150);
    ctx.translate(75, 75);
    ctx.scale(0.4, 0.4);
    ctx.rotate(-Math.PI/2);

    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'white';
    ctx.lineWidth = 8;
    ctx.lineCap = "round";

    //초기 설정 세이브
    ctx.save();

    //시 시계판
    for(var i=0; i<12; i++){
        stroke(100, 120);
        ctx.rotate(Math.PI/6); //6도씩 계속 돌림
    }
    ctx.restore();
    //시까지 세이브
    ctx.save();

    //분시계판
    // x좌표 117에서 시작해서 120까지 60개 선 그은 후 6도씩 돌리기
    ctx.lineWidth = 5;
    for (i=0;i<60;i++){
        if (i%5 == 0) {ctx.rotate(Math.PI/30); continue;}
        stroke(117, 120);
        ctx.rotate(Math.PI/30);
      }

    ctx.restore();

    var sec = now.getSeconds();
    var min = now.getMinutes();
    var hr = now.getHours();
    hr = (hr >= 12) ? (hr - 12) : hr;

    ctx.fillStyle = 'black';

    //시침 돌리기
    ctx.save();
    ctx.rotate((Math.PI/6)*hr + (Math.PI*6*60)*min + (Math.PI/60*60*60)*sec) //현재 시각 시침 위치 
    ctx.lineWidth = 13;
    stroke(-10, 75);
    ctx.restore();

    //분침 돌리기
    ctx.save();
    ctx.rotate((Math.PI/30)*min + (Math.PI/1800)*sec);
    ctx.lineWidth = 10;
    stroke(-23, 105)
    ctx.restore();
    
    //초침 돌리기
    ctx.save();
    ctx.rotate((Math.PI/30)*sec);
    ctx.strokeStyle = '#D40000';
    ctx.fillStyle = '#D40000';
    ctx.lineWidth = 5;

    stroke(-30, 83);

    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, Math.PI*2, true);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(95,0,10,0,Math.PI*2,true);
    ctx.stroke();

    ctx.fillStyle = 'rgba(0, 0, 0, 0)';
    ctx.arc(0, 0, 3, 0, Math.PI*2, true);
    ctx.fill();
    ctx.restore();
     
    ctx.beginPath();
    ctx.lineWidth = 14;
    ctx.strokeStyle = '#325FA2';
    ctx.arc(0, 0, 142, 0, Math.PI*2, true);
    ctx.stroke(); 
    ctx.restore(); 

    function stroke(moveTo, lineTo){
        ctx.beginPath();
        ctx.moveTo(moveTo, 0);
        ctx.lineTo(lineTo, 0);
        ctx.stroke();
    }
}

init();