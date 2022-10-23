// Canvas initialization
var canvas = new fabric.Canvas('canvas', {
    isDrawingMode: false
});

canvas.setHeight(window.innerHeight);
canvas.setWidth(window.innerWidth);


canvas.add(new fabric.Circle({ radius: 30, fill: '#f55', top: window.innerHeight / 2, left: window.innerWidth / 2 }));


// Initializing tool buttons
let butPen = document.getElementById('pen');
let butEraser = document.getElementById('eraser');
let butSelect = document.getElementById('select');

function togglePen() {
    canvas.isDrawingMode = true;
}

function toggleEraser() {
    canvas.freeDrawingBrush = new fabric.EraserBrush(canvas);
    canvas.freeDrawingBrush.width = 10;
    canvas.isDrawingMode = true;
}

function toggleSelect() {
    canvas.isDrawingMode = false;
}
