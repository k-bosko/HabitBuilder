function CanvasModule() {
    const canvasModule = {};
    let _canvases;
    let _puzzles = [];

    //TODO extend factorize with other options from create-habit.html
    const factorize = {
        "4": {"rows": 2, "cols": 2},
        "6": {"rows": 2, "cols": 3},
        "8": {"rows": 2, "cols": 4},
        "9": {"rows": 3, "cols": 3},
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
        drawComplexShape = DrawComplexShapeModule();
        constructor(rowIndex, colIndex, index, size, img, context){
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
            this.isDrawn = false;

            //tab params
            const sz = Math.min(this.width, this.height);
            this.tabNeck = 0.1 * sz;
            this.tabWidth = 0.2 * sz;
            this.tabHeight = 0.2 * sz;

        }

        drawBoundary(){
            this.context.beginPath();

            //figure out location and size of these pieces based on the # of rows and cols
            //and size of image on the screen
            //here placeholders, calc exact values in constructor
            this.context.strokeStyle = 'black';
            this.context.lineWidth = 1;

            this.drawComplexShape.drawBoundaryWithTabs(this);

            this.highlighted = false;
        }

        drawPieceImage(){
            this.drawComplexShape.drawBoundaryWithTabs(this);
            this.context.save();
            this.context.clip();

            this.context.globalAlpha = 1;
            const pieceWidth = this.img.width / this.numCols;
            const pieceHeight = this.img.height / this.numRows;

            const scaledTabHeight = Math.min(pieceWidth, pieceHeight) * this.tabHeight/Math.min(this.width, this.height);

            // each piece needs to crop specific part of the image and show it
            this.context.drawImage(this.img,
                // next 4 params specify where to take data from
                this.colIndex * pieceWidth - scaledTabHeight, // x position
                this.rowIndex * pieceHeight - scaledTabHeight, // y position
                pieceWidth + scaledTabHeight * 2,
                pieceHeight + scaledTabHeight * 2,
                // next 4 params specify where to place pieces on canvas
                this.x - this.tabHeight,
                this.y - this.tabHeight,
                this.width + this.tabHeight * 2,
                this.height + this.tabHeight * 2);

            this.context.restore();
        }

        highlight() {
            if (this.highlighted) {
                return;
            }

            this.context.beginPath();
            this.context.strokeStyle = 'red'; //must be applied before drawing an object
            this.context.lineWidth = 5;
            this.drawComplexShape.drawBoundaryWithTabs(this);

            this.highlighted = true;
        }
    }

    class Puzzle {
        //scaler specifies how much of the screen space will be used by the image
        scaler = 1.0; //will have 10% margin on the left and 10% on the right
        size = {}
        constructor(rows, cols, image, canvas) {
            this.image = image;
            this.canvas = canvas;
            this.size.width = 0;
            this.size.height = 0;
            this.size.x = 0;
            this.size.rows = rows;
            this.size.cols = cols;
            this.pieces = [];
            this.context = canvas.getContext('2d');
        }

        initialize(){
            this.addEventListeners();
            this.handleResize();
            window.addEventListener('resize', this.handleResize.bind(this));
            this.initiliazePieces(this.size.rows, this.size.cols);
            this.updateCanvas();
        }

        handleResize(){
            //to preserve aspect ratio and nothing is streched
            let resizer = this.scaler *
                        Math.min(
                            this.canvas.width / this.image.width,
                            this.canvas.height / this.image.height
                        );
            console.log(this.canvas.width, this.canvas.height)
            console.log(this.image.width, this.image.height)
            //update size attributes based on resizer
            this.size.width = resizer * this.image.width;
            this.size.height = resizer * this.image.height;
            //for x and y coords we start in the middle of the screen
            //and go 1/2 width towards the left and 1/2 width towards the top
            this.size.x = this.canvas.width / 2 - this.size.width/2;
            this.size.y = this.canvas.height/2 - this.size.height/2;
            console.log(this.size)
        }

        updateCanvas(){
            //clear before drawing
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

            //draw Image by pieces
            for (const piece of this.pieces){
                piece.drawBoundary();
                if (piece.isDrawn == true){
                    piece.drawPieceImage();
                }
            }
        }

        initiliazePieces(rows, cols){
            let index = 0;
            for (let rowInd = 0; rowInd < rows; rowInd++){
                for (let colInd = 0; colInd < cols; colInd++){
                    let piece = new Piece(rowInd, colInd, index, this.size, this.image, this.context)
                    this.pieces.push(piece);
                    this.addTabInformation(piece);
                    console.log(piece);
                    index++;
                }
            }
        }

        addTabInformation(piece) {

            //if last row -> no bottom tabs
            if (piece.rowIndex == piece.numRows - 1){
                piece.bottomTabLoc = null;
            } else {
                piece.bottomTabLoc = this.assignTabLocation();
            }
            //if last column -> no right tabs
            if (piece.colIndex == piece.numCols - 1){
                piece.rightTabLoc = null;
            } else {
                piece.rightTabLoc = this.assignTabLocation();
            }

            //if first row -> no tab on the top
            if (piece.rowIndex == 0){
                piece.topTabLoc = null;
            } else {
                //connect piece from below to ones on top
                const pieceAbove = this.pieces[piece.index - piece.numCols];
                piece.topTabLoc = - pieceAbove.bottomTabLoc;
            }
            //if first column - no tab on the left
            if (piece.colIndex == 0){
                piece.leftTabLoc = null;
            } else {
                //connect piece to the right to the ones on left
                const pieceToTheLeft = this.pieces[piece.index - 1];
                piece.leftTabLoc = - pieceToTheLeft.rightTabLoc;
            }
        }

        assignTabLocation(){
            //sgn will decide if tab will be inner tab (-1) or extra tab (+1)
            const sgn=(Math.random() - 0.5) < 0? -1: 1;
            //where tab is located on edge --> not at the corners
            //allow tab to be between 30%-70% of the edge
            //bw 0.3 and 0.7 if outer tab, -0.3 and -0.7 if inner tab
            return sgn*(Math.random()*0.4 + 0.3);
        }

        /* =============
        EVENT LISTENERS
        ================ */

        addEventListeners(){
            this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
            this.canvas.addEventListener('click', this.onMouseClick.bind(this));
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
            if (selectedPiece != null && !selectedPiece.isDrawn){
                this.updateCanvas();
                selectedPiece.highlight();
            }
        }

        onMouseClick(evt){
            const selectedPiece = this.getPiece(evt);

            if (selectedPiece != null){
                selectedPiece.drawPieceImage();
                selectedPiece.isDrawn = true;
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

            const rows = factorize[canvasObject.numberOfDays].rows;
            const cols = factorize[canvasObject.numberOfDays].cols;

            const puzzle = new Puzzle(rows, cols, image, canvas);
            puzzle.initialize();
            _puzzles.push(puzzle);
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
