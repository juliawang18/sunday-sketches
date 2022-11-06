// Canvas initialization
let canvas = new fabric.Canvas('canvas', {
    isDrawingMode: false
});
canvas.setBackgroundColor('white');

canvas.setHeight(window.innerHeight);
canvas.setWidth(window.innerWidth);

// Add image of the week
let imageWidth = canvas.getWidth()/4
fabric.Image.fromURL('https://raw.githubusercontent.com/juliawang18/sunday-sketches/main/imgs/sunday_header.png', function(img) {
    img.scaleToWidth(imageWidth);
    let imageHeight = img.getScaledHeight()

    img.top = window.innerHeight/2 - imageHeight/2
    img.left = window.innerWidth/2 - imageWidth/2
    canvas.add(img);
});


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

function downloadImage(data, filename) {
    var a = document.createElement('a');
    a.href = data;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
}

// Adding download to menu
let saveButton = document.getElementById("save");
saveButton.addEventListener(
    "click",
    function (e) {
        let link = document.createElement('a');
        let canvas = document.getElementById('canvas');
        let dataURL = canvas.toDataURL("image/jpeg");
        downloadImage(dataURL, 'sundaysketch.jpeg')
    }
);


// Adding a copy and paste function - add just the clipboard
let copyButton = document.getElementById("copy");
copyButton.addEventListener(
    "click",
    function (e) {
        canvas.getElement().toBlob(function(blob) { 
            const item = new ClipboardItem({ "image/png": blob });
            navigator.clipboard.write([item]); 
        });

    }
);

copyButton.addEventListener(
    "click",
    function(e) {
        copyButton.style.backgroundColor = '#FFF6D5';
        setTimeout(() => { copyButton.style.backgroundColor = '#ffc800'; }, 450);
    }
)

