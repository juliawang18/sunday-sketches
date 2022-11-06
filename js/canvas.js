// Create cursor SVG
const getDrawCursor = ( brushSize=15, brushColor, strokeColor, strokeWeight=2 ) => {
    const circle = `
		<svg
			height="${brushSize}"
			fill="${brushColor}"
            stroke="${strokeColor}"
            stroke-width="${strokeWeight}"
			viewBox="0 0 ${brushSize * 2.5} ${brushSize * 2.5}"
			width="${brushSize}"
			xmlns="http://www.w3.org/2000/svg"
		>
			<circle
				cx="50%"
				cy="50%"
				r="${brushSize * 1.25}" 
			/>
		</svg>
	`;

    return `data:image/svg+xml;base64,${window.btoa(circle)}`;
};

// Canvas initialization
let brushSize = 15;
let lastTool = "";

let canvas = new fabric.Canvas('canvas', {
    isDrawingMode: false,
    freeDrawingCursor: `url(${getDrawCursor(brushSize, 'black', 'white')}) ${brushSize / 2} ${brushSize / 2}, crosshair`,
});

canvas.setHeight(window.innerHeight);
canvas.setWidth(window.innerWidth);

fabric.Object.prototype.selectable = false;

// Tool selection
function changeAction(target) {
    ['pen', 'erase', 'select'].forEach(action => {
        const t = document.getElementById(action);
        t.classList.remove('active');
    });

    if (typeof target === 'string') target = document.getElementById(target);
    target.classList.add('active');

    switch (target.id) {
        case "pen":
            lastTool = "pen";
            canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
            canvas.isDrawingMode = true;
            brushSize = parseInt(document.getElementById("size").value);
            canvas.freeDrawingBrush.width = brushSize;
            canvas.freeDrawingCursor = `url(${getDrawCursor(brushSize, 'black', 'white')}) ${brushSize / 2} ${brushSize / 2}, crosshair`;
            break;
        case "erase":
            lastTool = "eraser";
            canvas.freeDrawingBrush = new fabric.EraserBrush(canvas);
            canvas.isDrawingMode = true;
            brushSize = parseInt(document.getElementById("size").value);
            canvas.freeDrawingBrush.width = brushSize;
            canvas.freeDrawingCursor = `url(${getDrawCursor(brushSize, 'white', 'black')}) ${brushSize / 2} ${brushSize / 2}, crosshair`;
            break;
        case "select":
            canvas.isDrawingMode = false;
            break;
        default:
            break;
    }
}

// Toggle brush / eraser size
document.getElementById("size").onchange = function () {
    brushSize = parseInt(document.getElementById("size").value);
    canvas.freeDrawingBrush.width = brushSize;

    let brushColor, strokeColor;
    if (lastTool == "pen") {
        brushColor = 'black';
        strokeColor = 'white';
    } else if (lastTool == "eraser") {
        brushColor = 'white';
        strokeColor = 'black';
    }
    canvas.freeDrawingCursor = `url(${getDrawCursor(brushSize, brushColor, strokeColor)}) ${brushSize / 2} ${brushSize / 2}, crosshair`;
    // console.log(size);
};



