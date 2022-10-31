// Canvas initialization
let canvas = new fabric.Canvas('canvas', {
    isDrawingMode: false
});

canvas.setHeight(window.innerHeight);
canvas.setWidth(window.innerWidth);

// Tools
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
            canvas.isDrawingMode = true;
            break;
        case "select":
            canvas.isDrawingMode = false;
            break;
        default:
            break;
    }
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
