// Create cursor SVG
const getDrawCursor = ( brushSize, brushColor, strokeColor, strokeWeight=2 ) => {
	const circle = `
		<svg
			height="${ brushSize + strokeWeight }"
			fill="${ brushColor }"
            stroke="${ strokeColor }"
            stroke-width="${ strokeWeight }"
			viewBox="0 0 ${ brushSize * 2.5 } ${ brushSize * 2.5 }"
			width="${ brushSize + strokeWeight }"
			xmlns="http://www.w3.org/2000/svg"
		>
			<circle
				cx="50%"
				cy="50%"
				r="${ brushSize + strokeWeight }" 
			/>
		</svg>
	`;
	
	return `data:image/svg+xml;base64,${ window.btoa(circle) }`;
};

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
            canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
            // canvas.freeDrawingBrush = new fabric.CustomBrush(canvas);
            canvas.freeDrawingBrush.width = 15;
            canvas.isDrawingMode = true;
            break;
        case "erase":
            canvas.freeDrawingBrush = new fabric.EraserBrush(canvas);
            canvas.freeDrawingBrush.width = 15;
            canvas.freeDrawingCursor = `url(${ getDrawCursor(15, 'white', 'black') }) ${ 15 / 2 } ${ 15 / 2 }, crosshair`,
            canvas.isDrawingMode = true;
            break;
        case "select":
            canvas.isDrawingMode = false;
            break;
        default:
            break;
    }
}

// Canvas initialization
let canvas = new fabric.Canvas('canvas', {
    isDrawingMode: true,
    freeDrawingCursor: `url(${ getDrawCursor(15, 'black', 'white') }) ${ 15 / 2 } ${ 15 / 2 }, crosshair`,
});

canvas.setHeight(window.innerHeight);
canvas.setWidth(window.innerWidth);

canvas.freeDrawingBrush.width = 15;

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
