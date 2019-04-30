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

const UP = 1;
const DOWN = 0;

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


const getPlusMinus = () => Math.floor(Math.random() * 4.999 - 2);

const getRootLine = (direction) => {
  const startingLine = [];
  const yStart = MARGIN;
  const xStart = MARGIN;
  for(x=xStart; x<=SIZE-MARGIN; x+=STEP){
    const nextYModifier = (Math.random() * 20) + 10;
    const nextXModifier = (Math.random() * 20) - 10;
    const length = startingLine.length;
    lastY = startingLine.length > 0 ? startingLine[length-1].y : yStart;
    lastX = startingLine.length > 0 ? startingLine[length-1].x : xStart;
    if(Math.floor(x/STEP) % 2 == direction){
      startingLine.push({x: lastX + nextXModifier + STEP, y: lastY - nextYModifier})
    } else {
      startingLine.push({x: lastX + nextXModifier + STEP, y: lastY + nextYModifier})
    }
  }
  return startingLine;
}

const getLineSetFromRoot = (rootLine) => {
  const allLines = [rootLine];
  for(i=0; i<LINES_PER_SET; i+= 1){
    allLines.push(
      rootLine.map((point) => ({x:point.x, y:point.y + i * LINE_SPACING}))
    );
  }
  return allLines;
}

const drawSingleLine = (line) => {
  line.reduce((last, next) => {
    context.moveTo(
      last.x + getPlusMinus(),
      last.y + getPlusMinus()
      );
    context.lineTo(
      next.x-SEGMENT_SPACING + getPlusMinus(),
      next.y + getPlusMinus()
      );
    context.stroke();
    return next;
  })
};

getLineSetFromRoot(getRootLine(UP)).map(drawSingleLine);
getLineSetFromRoot(getRootLine(DOWN)).map(drawSingleLine);
