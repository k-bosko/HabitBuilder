function DrawComplexShapeModule(){
    const drawComplextShapeModule = {}

    /*================================
    DRAWING COMPLEX BOUNDARY WITH TABS
    ================================*/
    function drawBoundaryWithTabs(piece){

        /*
        (x,y+height)<--------^(x+width, y+height)
                    |        |
                    |        |
        Origin(x,y) |________> (x+width, y)
        */
        //from bottom left
        piece.context.moveTo(piece.x, piece.y);

        //to bottom right
        //add detour if there is a tab
        if (piece.topTabLoc){
            piece.context.lineTo(piece.x + piece.width*Math.abs(piece.topTabLoc) - piece.tabNeck,
                        piece.y);

            piece.context.bezierCurveTo(
                piece.x + piece.width*Math.abs(piece.topTabLoc) - piece.tabNeck,
                piece.y - piece.tabHeight*Math.sign(piece.topTabLoc) * 0.2,

                piece.x + piece.width*Math.abs(piece.topTabLoc) - piece.tabWidth,
                piece.y - piece.tabHeight*Math.sign(piece.topTabLoc),

                piece.x + piece.width*Math.abs(piece.topTabLoc),
                piece.y - piece.tabHeight*Math.sign(piece.topTabLoc)
            );
            piece.context.bezierCurveTo(
                piece.x + piece.width*Math.abs(piece.topTabLoc) + piece.tabWidth,
                piece.y - piece.tabHeight*Math.sign(piece.topTabLoc),

                piece.x + piece.width*Math.abs(piece.topTabLoc) + piece.tabNeck,
                piece.y - piece.tabHeight*Math.sign(piece.topTabLoc) * 0.2,

                piece.x + piece.width*Math.abs(piece.topTabLoc) + piece.tabNeck,
                piece.y
            );
        }
        piece.context.lineTo(piece.x + piece.width, piece.y);

        //to top right
        //add detour if there is a tab
        if (piece.rightTabLoc){
            piece.context.lineTo(piece.x + piece.width, piece.y + piece.height * Math.abs(piece.rightTabLoc) - piece.tabNeck);

            piece.context.bezierCurveTo(
                piece.x + piece.width + piece.tabHeight*Math.sign(piece.rightTabLoc) * 0.2,
                piece.y + piece.height*Math.abs(piece.rightTabLoc) - piece.tabNeck,

                piece.x + piece.width + piece.tabHeight*Math.sign(piece.rightTabLoc),
                piece.y + piece.height*Math.abs(piece.rightTabLoc) - piece.tabWidth,

                piece.x + piece.width + piece.tabHeight*Math.sign(piece.rightTabLoc),
                piece.y + piece.height*Math.abs(piece.rightTabLoc)
            );
            piece.context.bezierCurveTo(
                piece.x + piece.width + piece.tabHeight*Math.sign(piece.rightTabLoc),
                piece.y + piece.height*Math.abs(piece.rightTabLoc) + piece.tabWidth,

                piece.x + piece.width + piece.tabHeight*Math.sign(piece.rightTabLoc) * 0.2,
                piece.y + piece.height*Math.abs(piece.rightTabLoc) + piece.tabNeck,

                piece.x + piece.width,
                piece.y + piece.height*Math.abs(piece.rightTabLoc) + piece.tabNeck,
            );
        }
        piece.context.lineTo(piece.x + piece.width, piece.y + piece.height);

        //to top left
        //add detour if there is a tab
        if (piece.bottomTabLoc){
            piece.context.lineTo(piece.x + piece.width*Math.abs(piece.bottomTabLoc) + piece.tabNeck, piece.y + piece.height);

            piece.context.bezierCurveTo(
                piece.x + piece.width*Math.abs(piece.bottomTabLoc) + piece.tabNeck,
                piece.y + piece.height + piece.tabHeight*Math.sign(piece.bottomTabLoc) * 0.2,

                piece.x + piece.width*Math.abs(piece.bottomTabLoc) + piece.tabWidth,
                piece.y + piece.height + piece.tabHeight*Math.sign(piece.bottomTabLoc),

                piece.x + piece.width*Math.abs(piece.bottomTabLoc),
                piece.y + piece.height + piece.tabHeight*Math.sign(piece.bottomTabLoc)
            );

            piece.context.bezierCurveTo(
                piece.x + piece.width*Math.abs(piece.bottomTabLoc) - piece.tabWidth,
                piece.y + piece.height + piece.tabHeight*Math.sign(piece.bottomTabLoc),

                piece.x + piece.width*Math.abs(piece.bottomTabLoc) - piece.tabNeck,
                piece.y + piece.height + piece.tabHeight*Math.sign(piece.bottomTabLoc) * 0.2,

                piece.x + piece.width*Math.abs(piece.bottomTabLoc) - piece.tabNeck,
                piece.y + piece.height
            );

        }
        piece.context.lineTo(piece.x, piece.y + piece.height);

        //to bottom left
        //add detour if there is a tab
        if (piece.leftTabLoc){
            piece.context.lineTo(piece.x, piece.y + piece.height*Math.abs(piece.leftTabLoc) + piece.tabNeck);

            piece.context.bezierCurveTo(
                piece.x - piece.tabHeight*Math.sign(piece.leftTabLoc)*0.2,
                piece.y + piece.height*Math.abs(piece.leftTabLoc) + piece.tabNeck,

                piece.x - piece.tabHeight*Math.sign(piece.leftTabLoc),
                piece.y + piece.height * Math.abs(piece.leftTabLoc) + piece.tabWidth,

                piece.x - piece.tabHeight*Math.sign(piece.leftTabLoc),
                piece.y + piece.height*Math.abs(piece.leftTabLoc)
            );

            piece.context.bezierCurveTo(
                piece.x - piece.tabHeight*Math.sign(piece.leftTabLoc),
                piece.y + piece.height*Math.abs(piece.leftTabLoc) - piece.tabWidth,

                piece.x - piece.tabHeight*Math.sign(piece.leftTabLoc)*0.2,
                piece.y + piece.height*Math.abs(piece.leftTabLoc) - piece.tabNeck,

                piece.x,
                piece.y + piece.height*Math.abs(piece.leftTabLoc) - piece.tabNeck
            );
        }
        piece.context.lineTo(piece.x, piece.y);
        piece.context.stroke();
    }

    drawComplextShapeModule.drawBoundaryWithTabs = drawBoundaryWithTabs;
    return drawComplextShapeModule;
}
