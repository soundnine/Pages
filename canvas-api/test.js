// const canvas = document.querySelector('#canvas');
// const body = document.body;
// body.style.margin = 0;
// body.style.padding = 0;
// body.style.width = '100%';
// body.style.height = '100%';

// canvas.style.width = 'inherit';
// canvas.style.height = 'inherit';
// canvas.style.backgroundColor = 'gray';
// const ctx = canvas.getContext('2d');

// ctx.fillStyle = 'red';
// ctx.strokeStyle = 'black';
// ctx.font = '40px Arial';

// ctx.fillRect(0, 5, 150, 40);
// ctx.strokeText('1. Hello', 5, 40);

// ctx.transform(0.5, 0.4, -0.2, 1.2, 200, 0);
// ctx.fillRect(20, 25, 150, 40);
// ctx.strokeText('2. Hello', 5, 40);

// for(let i=0; i<3; i++){
//     for(let j=0; j<3; j++){
//         ctx.save();
//         ctx.fillStyle = `rgb(${51*i}, ${255-(51*i)}, 255)`;
//         ctx.translate(10+(j*50), 10+(i*50));
//         ctx.fillRect(0, 0, 25, 25);
//         ctx.restore();
//     }
// }
// ctx.fillStyle = '#0095DD';
// ctx.fillRect(1000, 200, 100, 100);
// ctx.fillStyle = '#4D4E53';
// for(let i=1; i<81; i++){
//     ctx.translate(20, 0)
//     ctx.rotate((Math.PI*i) / 180);
//     ctx.fillRect(30, 200, 100, 100);
// }

//   ctx.save();
//   ctx.scale(10, 3);
//   ctx.fillRect(1, 10, 10, 10);
//   ctx.restore();

//   ctx.scale(-1, 1);
//   ctx.font = '48px serif';
//   ctx.fillText('MDN', 135, 120);

//transform(수평길이 배율, x기울이기, y기울이기, 수직길이 배율, x좌표이동, y좌표이동)
