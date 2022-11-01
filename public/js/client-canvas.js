function CanvasModule() {
    const canvasModule = {};
    let _canvases;
    let _puzzles = [];

    const factorize = {
        "4": {"rows": 2, "cols": 2},
        "6": {"rows": 2, "cols": 3},
        "8": {"rows": 2, "cols": 4},
        "9": {"rows": 3, "cols": 3},
        "10": {"rows": 5, "cols": 5},
        "12": {"rows": 3, "cols": 4},
        "14": {"rows": 2, "cols": 7},
        "15": {"rows": 3, "cols": 5},
        "16": {"rows": 4, "cols": 4},
        "18": {"rows": 3, "cols": 6},
        "20": {"rows": 4, "cols": 5},
        "22": {"rows": 2, "cols": 11},
        "24": {"rows": 4, "cols": 6},
        "25": {"rows": 5, "cols": 5},
        "26": {"rows": 2, "cols": 13},
        "27": {"rows": 3, "cols": 9},
        "28": {"rows": 4, "cols": 7},
        "30": {"rows": 5, "cols": 6},
    };

    class Piece {
        constructor(puzzle, rowIndex, colIndex, index, size, img, context, isOpened){
            this.puzzle = puzzle

            this.context = context;
            this.img = img;
            this.numRows = size.rows;
            this.numCols = size.cols;

            //piece indices
            this.rowIndex = rowIndex;
            this.colIndex = colIndex;
            this.index = index;

            //piece width and height
            this.width = size.width/size.cols;
            this.height = size.height/size.rows;

            //piece location
            this.x = size.x + this.width * this.colIndex;
            this.y = size.y + this.height * this.rowIndex;

            //piece status
            this.highlighted = false;
            this.isDrawn = isOpened;
        }

        //draw piece
        drawBoundary(context){
            context.beginPath();
            context.strokeStyle = 'lightgrey';
            context.lineWidth = 1;
            //figure out location and size of these pieces based on the # of rows and cols
            //and size of image on the screen
            context.rect(this.x, this.y, this.width, this.height);
            //!! add stroke, otherwise nothing will be drawn
            context.stroke();
            this.highlighted = false;
        }

        drawPieceImage(){
            this.context.save();
            this.context.clip();

            this.context.globalAlpha = 1;

            const pieceWidth = this.img.width / this.numCols;
            const pieceHeight = this.img.height / this.numRows;

            // each piece needs to crop specific part of the image and show it
            this.context.drawImage(this.img,
                // next 4 params specify where to take data from
                this.colIndex * pieceWidth, // x position
                this.rowIndex * pieceHeight, // y position
                pieceWidth,
                pieceHeight,
                // next 4 params specify where to place pieces on canvas
                this.x,
                this.y,
                this.width,
                this.height);

            this.context.restore();
        }

        highlight() {
            if (this.highlighted) {
                return;
            }
            this.context.beginPath();
            this.context.strokeStyle = 'red'; //must be applied before drawing an object
            this.context.lineWidth = 1;
            this.context.rect(this.x, this.y, this.width, this.height);
            this.context.stroke();

            this.highlighted = true;
        }
    }

    class Puzzle {
        size = {}
        constructor(rows, cols, image, canvas, puzzleData) {
            const maxWidth = 600;

            this.image = image;

            this.ratio = maxWidth / this.image.width;
            this.canvas = canvas;

            this.canvas.width = this.image.width * this.ratio;
            this.canvas.height = this.image.height * this.ratio;

            this.size.width = this.canvas.width;
            this.size.height = this.canvas.height;
            this.size.x = 0;
            this.size.y = 0;
            this.size.rows = rows;
            this.size.cols = cols;
            this.pieces = [];
            this.context = canvas.getContext('2d');

            this.habitId = puzzleData.habitId;
            this.openPieces = puzzleData.openPieces;
        }

        initialize(){
            this.initiliazePieces(this.size.rows, this.size.cols);
            this.addEventListeners();
            this.updateCanvas();
        }

        updateCanvas(){
            //clear before drawing
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

            //draw Image by pieces
            for (const piece of this.pieces){
                piece.drawBoundary(this.context);
                if (piece.isDrawn === true) {
                    piece.drawPieceImage();
                }
            }
        }

        initiliazePieces(rows, cols){
            let index = 0;
            for (let rowInd = 0; rowInd < rows; rowInd++){
                for (let colInd = 0; colInd < cols; colInd++){
                    const isOpened = Boolean(this.openPieces[index])
                    let piece = new Piece(
                        this, rowInd, colInd, index,
                        this.size, this.image, this.context,
                        isOpened
                    );
                    this.pieces.push(piece);
                    console.log(piece);
                    index++;
                }
            }
        }

        getOpenPieces() {
            let openPieces = new Array(this.pieces.length).fill(false);
            for (const piece of this.pieces) {
                openPieces[piece.index] = piece.isDrawn;
            }
            return openPieces;
        }

        /* =============
        EVENT LISTENERS
        ================ */

        addEventListeners(){
            this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
            this.canvas.addEventListener('click', this.onMouseClick.bind(this));
            this.canvas.addEventListener('mouseout', () => {
                this.updateCanvas();
            });
        }

        getPiece(loc){
            const canvasPosition = loc.target.getBoundingClientRect();
            //iterate through each pieces loc and see if the mouse location is within the bounds of each piece
            for (const piece of this.pieces){
                if ((loc.x - canvasPosition.x) > piece.x &&
                    (loc.x - canvasPosition.x) < piece.x + piece.width &&
                    (loc.y - canvasPosition.y) > piece.y &&
                    (loc.y - canvasPosition.y) < piece.y + piece.height
                ){
                    return piece;
                }
            }
            return null; //nothing was pressed
        }

        onMouseMove(evt){
            const selectedPiece = this.getPiece(evt);
            if (selectedPiece !== null && !selectedPiece.isDrawn) {
                this.updateCanvas();
                selectedPiece.highlight();
            }
        }

        onMouseClick(evt){
            const selectedPiece = this.getPiece(evt);

            if (selectedPiece !== null && selectedPiece.isDrawn === false){
                selectedPiece.drawPieceImage();
                selectedPiece.isDrawn = true;
                //openPieces as array of true false
                saveClickedPiece(this.habitId, selectedPiece.puzzle.getOpenPieces());
                showModalLogUnit(this.habitId);
            }
        }
    }

    async function init(canvases) {
        _canvases = canvases;
        console.log("INSIDE CANVAS MODULE", _canvases);
        for (const [habitId, canvasObject] of Object.entries(_canvases)) {
            const canvas = canvasObject.canvas;
            const image = new Image();
            image.src = canvasObject.image;
            await image.decode();
            const numOfDays = String(canvasObject.numberOfDays);
            const rows = factorize[numOfDays].rows;
            const cols = factorize[numOfDays].cols;

            const puzzleDataRes = await fetch(`/api/puzzles/${habitId}`, { "method": "get" });
            if (!(puzzleDataRes.ok && puzzleDataRes.status === 200)) {
                return console.log("Error downloading puzzle data", puzzleDataRes);
            }
            const puzzleData = await puzzleDataRes.json();
            console.log("puzzle data", puzzleData);

            //const puzzleData = {'_id': 123, 'habitId': 456, 'openPieces': [false, false]}
            const puzzle = new Puzzle(rows, cols, image, canvas, puzzleData);
            puzzle.initialize();
            _puzzles.push(puzzle);
        }
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
