// Canvas initialization
let canvas = new fabric.Canvas('canvas', {
    isDrawingMode: false
});

canvas.setHeight(window.innerHeight);
canvas.setWidth(window.innerWidth);

// Add image of the week


// Initializing tool buttons
let butPen = document.getElementById('pen');
let butEraser = document.getElementById('eraser');
let butSelect = document.getElementById('select');

function togglePen() {
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.width = 20;
}

function toggleEraser() {
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush = new fabric.EraserBrush(canvas);
    canvas.freeDrawingBrush.width = 10;
}

function toggleSelect() {
    canvas.isDrawingMode = false;
}

// Adding download to menu
let saveButton = document.getElementById("save");

saveButton.addEventListener(
    "click",
    function (e) {
        this.href = canvas.toDataURL({
            format: "png"
        });

        this.download = "sundaysketch.png";
    },
    false
);
