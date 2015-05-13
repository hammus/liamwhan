//Deps
//1. jQuery

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

    /**
     * Wrapper function so we can easily switch it off, like a DOCTOR.
     */
    function initCanvas() {
        img.onload = function() {

            //Init memory store.
            _imageCanvas.width = img.width;
            _imageCanvas.height = img.height;
            _imageCtx.drawImage(img, 0, 0);
            _imageData = _imageCanvas.toDataURL();



            mask.onload = function() {
                //Init memory store, mask.
                _maskCanvas.width  = mask.width;
                _maskCanvas.height = mask.height;
                _maskCtx.drawImage(mask, 0, 0);
                _maskData = _maskCanvas.toDataURL();

                drawMasked(canvas, context, img, mask);




            };
            mask.src = "assets/sydney_SIL_mask.png";

        };
        img.src = "assets/wharf.png";

        window.onresize = function() {


            var newImg = new Image();
            var newMask = new Image();

            newImg.onload = function() {

                newMask.onload = function() {

                    drawMasked(canvas, context, newImg, newMask);

                };
                newMask.src = _maskData;

            };
            newImg.src = _imageData;
        }
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



//Init Dom Canvas, In memory canvases/contexts for mask and image data resuse
    var canvas          =   document.createElement('canvas'),
        context         =   canvas.getContext('2d'),
        _maskCanvas      =   document.createElement("canvas"),
        _maskCtx         =   _maskCanvas.getContext("2d"),
        _imageCanvas    =   document.createElement('canvas'),
        _imageCtx       =   _imageCanvas.getContext('2d'),
        mask            =   new Image(),
        img             =   new Image(),
        _imageData, _maskData;

    //Man-handle the DOM
    document.getElementsByTagName('body')[0].appendChild(canvas);


    //initCanvas();








});