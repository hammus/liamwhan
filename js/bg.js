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

    function tweener(from, to, duration, loop, callback) {
        //Private
        var _startTime = 0, _progress = 0, _lastUpdate = 0, _animFrameRef;
        var inst = {
            from: from,
            to: to,
            delta: this.to - this.from,
            duration: duration || 1000,
            callback: callback,
            callbackArguments: cbArgs,
            loop: loop || false,
            end: this.to - this.from,

            play: function () {
                _start = Date.now();

                _animFrameRef = window.requestAnimationFrame(tweener.tick);
            },
            tick: function () {
                //Clamp progress
                _progress = (_progress > 1) ? 1 : _progress;

                var now = Date.now();
                var alpha = (now - _startTime) / duration;

                _lastUpdate = now;

                update(alpha);


            },
            update: function (alpha) {

            },
            stop: function () {
                window.cancelAnimationFrame(_animFrameRef);
            }
        }

        return inst;
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


            // mask.onload = function() {
            //    //Init memory store, mask.
            //    _maskCanvas.width  = mask.width;
            //    _maskCanvas.height = mask.height;
            //    _maskCtx.drawImage(mask, 0, 0);
            //    _maskData = _maskCanvas.toDataURL();
            //
            //    drawMasked(canvas, context, img, mask);
            //
            //
            //
            //
            //};
            //mask.src = "assets/sydney_SIL_mask.png";

        };
        img.src = "assets/bg.jpg";

        //window.onresize = function() {
        //
        //
        //    var newImg = new Image();
        //    var newMask = new Image();
        //
        //    newImg.onload = function() {
        //
        //        newMask.onload = function() {
        //
        //            drawMasked(canvas, context, newImg, newMask);
        //
        //        };
        //        newMask.src = _maskData;
        //
        //    };
        //    newImg.src = _imageDataUrl;
        //}
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