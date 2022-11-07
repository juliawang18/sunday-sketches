/**
 * CustomBrush class
 * @class fabric.CustomBrush
 * @extends fabric.BaseBrush
 */
 (function(fabric){

    fabric.CustomBrush = fabric.util.createClass(fabric.BaseBrush, {
  
      color: "#000000",
      opacity: 0.6,
      width: 10,
  
      _baseWidth: 5,
      _inkAmount: 20,
      _latestStrokeLength: 0,
      _point: null,
      _sep: 5,
      _size: 0,
  
      initialize: function(canvas, opt) {
        opt = opt || {};
  
        this.canvas = canvas;
        this.width = opt.width || canvas.freeDrawingBrush.width;
        this.color = opt.color || canvas.freeDrawingBrush.color;
        this.opacity = opt.opacity || canvas.contextTop.globalAlpha;
        this._point = new fabric.Point(0, 0);
      },
  
      changeColor: function(color){
        this.color = color;
      },
  
      changeOpacity: function(value){
        this.opacity = value;
      },
  
      onMouseDown: function(pointer){
        this.canvas.contextTop.globalAlpha = this.opacity;
        this._size = this.width / 2 + this._baseWidth;
        this.set(pointer);
      },
  
      onMouseMove: function(pointer){
        this.update(pointer);
        this.draw(this.canvas.contextTop);
      },
  
      onMouseUp: function(pointer){
      },
  
      set: function(p) {
        if (this._latest) {
          this._latest.setFromPoint(this._point);
        } else {
          this._latest = new fabric.Point(p.x, p.y);
        }
        fabric.Point.prototype.setFromPoint.call(this._point, p);
      },
  
      update: function(p) {
        this.set(p);
        this._latestStrokeLength = this._point.subtract(this._latest).distanceFrom({ x: 0, y: 0 });
      },
  
      draw: function(ctx) {
        var i, j, p, r, c, x, y, w, h, v, s, stepNum, dotSize, dotNum, range;
  
        v = this._point.subtract(this._latest);
        s = Math.ceil(this._size / 2);
        stepNum = Math.floor(v.distanceFrom({ x: 0, y: 0 }) / s) + 1;

        vMag = Math.sqrt(v.x**2 + v.y**2);
        v.setXY((v.x / vMag) * s, (v.y / vMag) * s)
        // v.normalize(s);
  
        dotSize = this._sep * clamp(this._inkAmount / this._latestStrokeLength * 3, 1, 0.5);
        dotNum = Math.ceil(this._size * this._sep);
  
        range = this._size / 2;
  
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.beginPath();
        for (i = 0; i < dotNum; i++) {
          for (j = 0; j < stepNum; j++) {
            p = this._latest.add(v.multiply(j));
            r = Math.random() * range;
            c = Math.random() * Math.PI * 2;
            w = Math.random() * ((dotSize) - (dotSize)) + (dotSize);
            h = Math.random() * ((dotSize) - (dotSize)) + (dotSize);
            x = p.x + r * Math.sin(c) - w / 2;
            y = p.y + r * Math.cos(c) - h / 2;
            ctx.rect(x, y, w, h);
          }
        }
        ctx.fill();
        ctx.restore();
      }
    });

    const clamp = (num, a, b) => Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));
  
  })(fabric);