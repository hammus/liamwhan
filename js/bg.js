//Deps
//1. jQuery
//2. Underscore.js

$(document).ready(function() {
    //helper functions for viewport Size
    var vw = function() {
        return $(window).width()
    };

    var vh = function() {
        return $(window).height()
    };

    //Debug
    function logViewport()
    {
        console.log("Viewport = { x: " + vw() + ", y: " + vh() + "}\n");
    }

    function Tweener(from, to, duration, loop, callback) {
        //Private
        var _startTime = Date.now(),
            _progress = 0,
            _lastUpdate = Date.now(),
            _animFrameRef,
            _callback = callback;


            this.from =  from;
            this.to = to;
            this.duration = duration || 1000;
            this.loop = loop || false;
            this.end = this.to - this.from;

        }


    };

Tweener.prototype.play = function () {
    _start = Date.now();

    _animFrameRef = window.requestAnimationFrame(tweener.tick);
};

Tweener.tick = function () {
    //Clamp progress
    _progress = (_progress > 1) ? 1 : _progress;

    var now = Date.now();
    var delta = (now - _startTime) / duration;

    _lastUpdate = now;

    update(delta);


},
update: function (dt) {

},
stop: function () {
    window.cancelAnimationFrame(_animFrameRef);
}

    function rgbShift(canvas, context, shiftRadius) {
        if (!shiftRadius) shiftRadius = 10;

        var shiftData, shift, redData, pixelData, pixels;


        pixels = context.getImageData(0, 0, canvas.width, canvas.height);
        pixelData = pixels.data;
        redData = context.createImageData(canvas.width, canvas.height);
        shift = context.createImageData(canvas.width, canvas.height);
        shiftData = shift.data;


        for (var i = 0; i < pixelData.length; i += 4) {
            redData.data[i] = 0; //Red
            redData.data[i + 1] = 0; //Green
            redData.data[i + 2] = pixelData[i + 2]; // Blue
            redData.data[i + 3] = 255; // Alpha

        }

        //loop through canvas coords
        for (var y = 0; y < canvas.height; y++) {
            for (var x = 0; x < canvas.width; x++) {

                var dataIndex = ((canvas.width * y) + x) * 4;

                var deltaPos = dataIndex + (shiftRadius * 4);
                var deltaNeg = dataIndex + (shiftRadius * 4 * -1);

                //Red
                shiftData[dataIndex] = pixelData[dataIndex];
                //shiftData[dataIndex] = 0;

                //Green
                if (typeof pixelData[deltaPos + 1] != 'undefined') {
                    shiftData[dataIndex + 1] = pixelData[deltaPos + 1];
                    //shiftData[dataIndex+1] = 0;
                }

                //Blue
                if (typeof pixelData[deltaNeg + 2] != 'undefined') {
                    shiftData[dataIndex + 2] = pixelData[deltaNeg + 2];

                }

                //Alpha
                if (typeof pixelData[deltaPos + 3] != 'undefined') {
                    shiftData[dataIndex + 3] = pixelData[deltaPos + 3];
                } else {
                    shiftData[dataIndex + 3] = 255;
                }


            }
        }
        context.putImageData(shift, 0, 0);
        // context.putImageData(redData, 0,0);
    }

    /**
     * Wrapper function so we can easily switch it off, like a DOCTOR.
     */
    function initCanvas() {
        img.onload = function () {

            //Init memory store.
            _imageCanvas.width = img.width;
            _imageCanvas.height = img.height;
            _imageCtx.drawImage(img, 0, 0);
            _imageDataUrl = _imageCanvas.toDataURL();

            draw(canvas, context, img);

            rgbShift(canvas, context, 5);

        };
        img.src = "assets/bg.jpg";


    }

    //
    /**
     * Draw the image to the canvas and mask with supplied Image object
     * @param canvas {HTMLCanvasElement} The HTML Canvas that the function will draw upon
     * @param context {CanvasRenderingContext2D} The 2D Context for the Canvas
     * @param image {Image} The Image object to be masked
     * @param mask {Image} The Mask to apply to the Image object
     * @param width {String} The CSS width to apply to the mask and image
     * @param height {String} The CSS height to apply to the mask and image
     * @returns canvas {HTMLCanvasElement} The updated Canvas Element
     */
    function drawMasked(canvas, context, image, mask, width, height){
        if(!width) width = "100vw";
        if(!height) height = "100vh";

        canvas.width = vw();
        canvas.height = vh();

        image.style.width = width;
        image.style.height = height;

        mask.style.width = width;
        mask.style.height = height;

        //draw
        context.drawImage(mask,0,0,mask.width,mask.height,0,0,canvas.width,canvas.height);
        context.globalCompositeOperation = 'source-atop';
        context.drawImage(image,0,0,image.width,image.height,0,0,canvas.width,canvas.height);

        return canvas;

    }

    function draw(canvas, context, image, width, height) {
        if (!width) width = "100vw";
        if (!height) height = "100vh";

        canvas.width = vw();
        canvas.height = vh();

        image.style.width = width;
        image.style.height = height;


        //draw

        context.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);

        return canvas;

    }



//Init Dom Canvas, In memory canvases/contexts for mask and image data resuse
//    var canvas          =   document.createElement('canvas'),
//        context         =   canvas.getContext('2d'),
//        _maskCanvas      =   document.createElement("canvas"),
//        _maskCtx         =   _maskCanvas.getContext("2d"),
//        _imageCanvas    =   document.createElement('canvas'),
//        _imageCtx       =   _imageCanvas.getContext('2d'),
//        mask            =   new Image(),
//        img             =   new Image(),
//        _imageDataUrl, _maskData;

    //Man-handle the DOM
    //document.getElementsByTagName('body')[0].appendChild(canvas);


    //get Image Data
    //var imageData = context.createImageData(canvas.width, canvas.height);



    //initCanvas();








});