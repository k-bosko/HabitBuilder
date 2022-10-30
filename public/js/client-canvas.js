function CanvasModule() {
    const canvasModule = {};
    let _canvases;
    let _puzzles = [];

    //TODO extend factorize with other options from create-habit.html
    const factorize = {
        4: {"rows": 2, "cols": 2},
        6: {"rows": 2, "cols": 3},
        8: {"rows": 4, "cols": 4}, 
        9: {"rows": 3, "cols": 3}

    };

    class Puzzle {
        constructor(rows, cols, image, canvas) {
            this.rows = rows;
            this.cols = cols;
            this.image = image;
            this.canvas = canvas;
        }
    }

    function init(canvases) {
        _canvases = canvases;
        console.log("INSIDE CANVAS MODULE", _canvases);
        for (const [habitId, canvasObject] of Object.entries(_canvases)) {
            const canvas = canvasObject.canvas;
            const image = canvasObject.image;
            const rows = factorize[canvasObject.number_of_days].rows;
            const cols = factorize[canvasObject.number_of_days].cols;

            _puzzles.push(new Puzzle(rows, cols, image, canvas));
        }
        //TODO push _puzzles into puzzle collection on mongo
        console.log(_puzzles);
    }

    function renderImages() {
        console.log("render images", _canvases);

        for (const [habitId, canvasObject] of Object.entries(_canvases)) {
            const c = canvasObject.canvas;
            const imgSrc = canvasObject.image;

            const context = c.getContext("2d");
            const image = new Image();
            image.src = imgSrc;
            image.onload = function() {
                context.drawImage(image, 0, 0, 400, 200);
            };
        }
    }


    canvasModule.init = init;
    canvasModule.renderImages = renderImages;
    return canvasModule;
}