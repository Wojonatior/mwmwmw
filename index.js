var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

const DPR = window.devicePixelRatio || 1;
const SIZE = window.innerWidth * .4;
const MARGIN = SIZE / 20;
const STEP = SIZE / 10;

canvas.width = SIZE * DPR;
canvas.height = SIZE * DPR;
context.scale(DPR, DPR);
context.lineWidth = 2;

const UP = 'UP';
const DOWN = 'DOWN';

const LINE_SPACING = 8;
const SEGMENT_SPACING = 2;
const LINES_PER_SET = (SIZE - (2* MARGIN)) / LINE_SPACING;

//TODO: Seperate out distance between segments and spacing between lines
//TODO: randomize x/y endpoints
//TODO: randomize distance between segments
//TODO: remove/add segments on some of the lines
  //idea: delete parts of line on first/last lines
  //idea: mark as hidden
// TODO: variable stroke width




const getNextDirection = (direction) => direction == UP ? DOWN : UP;
const getPlusMinus = () => Math.floor(Math.random() * 4.999 - 2);

const startingLine = [];
const y = MARGIN;
for(x=MARGIN; x<=SIZE-MARGIN; x+=STEP){
  startingLine.push({x, y});
}

const allLines = [startingLine];
for(i=0; i<LINES_PER_SET; i+= 1){
  allLines.push(
    startingLine.map((point) => ({x:point.x, y:point.y + i * LINE_SPACING}))
  );
}

allLines.map((line) => {
  line.reduce((last, next) => {
    nextY = last.direction == UP ? next.y + 20 : next.y - 20;
    lastY = last.direction == UP ? next.y - 20 : next.y + 20;
    context.moveTo(
      last.x + getPlusMinus(),
      lastY + getPlusMinus()
      );
    context.lineTo(
      next.x-SEGMENT_SPACING + getPlusMinus(),
      nextY + getPlusMinus()
      );
    context.stroke();
    return {...next, direction: getNextDirection(last.direction)};
  });
});

allLines.map((line) => {
  line.reduce((last, next) => {
    nextY = last.direction == DOWN ? next.y + 20 : next.y - 20;
    lastY = last.direction == DOWN ? next.y - 20 : next.y + 20;
    context.moveTo(
      last.x + getPlusMinus(),
      lastY + getPlusMinus()
      );
    context.lineTo(
      next.x-SEGMENT_SPACING + getPlusMinus(),
      nextY + getPlusMinus()
      );
    context.stroke();
    return {...next, direction: getNextDirection(last.direction)};
  });
});
