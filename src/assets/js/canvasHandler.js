
// null 16x16 array, a 256 bit private key
var pk = [ //pk stands for private key
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

function zeroCanvas(canvas) {
    for (var i = 0; i < canvas.length; i++) {
        for (var j = 0; j < canvas[i].length; j++) {
            canvas[i][j] = 0;
        }
    }
    return canvas;
}


//draw the grid on the canvas
function drawGrid(ctx, canvasElement) {
    let gridSize = 16; //in pixels
    let cell = 28;
    let width = cell * 16;
    let canvasWidth = 500;
    let canvasHeight = 500;

    ctx.setLineDash([1, 3]);
    ctx.strokeStyle = "black";

    for (var x = cell - 0.5; x < 17 * cell; x += cell) {
        // console.log(x);
        ctx.moveTo(x, cell);
        ctx.lineTo(x, width + cell);
    }

    ctx.stroke();

    for (var y = cell - 0.5; y < 17 * cell; y += cell) {
        // console.log(y);
        ctx.moveTo(cell, y);
        ctx.lineTo(width + cell, y);
    }

    ctx.stroke();

    // Putting captions 1-16 to X and Y
    ctx.font = "bold 12px Verdana";
    ctx.fillStyle = "black";
    for (var count = 1; count <= 16; count += 1) {
        ctx.fillText(count, 5, 20 + count * 28);
        ctx.fillText(count, 5 + count * 28, 20);
    }
}

function drawCanvas() {
    let gridSize = 16; //in pixels
    let canvasWidth = 500;
    let canvasHeight = 500;

    let canvasElement = document.getElementById("canvas");
    canvasElement.width = canvasWidth;
    canvasElement.height = canvasHeight;
    let ctx = canvasElement.getContext("2d");

    c_canvas = canvasElement;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    drawGrid(ctx, canvasElement);
    // for (var i = 0; i < canvas.length; i++) {
    //     for (var j = 0; j < canvas[i].length; j++) {
    //         if (canvas[i][j] == 1) {
    //             ctx.fillStyle = "#000000";
    //             ctx.fillRect(j * gridSize + canvasElement.offsetLeft, i * gridSize + canvasElement.offsetTop, gridSize, gridSize);
    //         }
    //     }
    // }



}

function binaryToHex(bin) {
    var hex = "";
    for (var i = 0; i < bin.length; i += 4) {
        hex += parseInt(bin.substring(i, i + 4), 2).toString(16);
    }
    return hex;
}

function hexToBinary(hex) {
    var bin = "";
    for (var i = 0; i < hex.length; i++) {
        bin += parseInt(hex.substring(i, i + 1), 16).toString(2);
    }
    return bin;
}

// Function fills/unfills the cell and changes the array element
function fillCell(CellToFill, context) {
    var LastCell = [16, 16]; // temp cell value out of range for fill by MouseMove event
    var blockX = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //used to block column from filling in advanced option
    var blockY = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //used to block row from filling in advanced option
    let cellfillcolour = "red";
    let cellnofillcolour = "white";
    let cell = 28;

    x = CellToFill[0];
    y = CellToFill[1];
    if ((x == -1 || y == -1) && IsLinesBlockOption) { blockLine(x, y) };
    if (x < 0 || y < 0 || x > 15 || y > 15 || (x == LastCell[0] && y == LastCell[1])) { return };
    if (blockX[x] == 1 || blockY[y] == 1) { return };
    if (pk[y][x] == 0) {
        colour = cellfillcolour;
        pk[y][x] = 1;
    } else {
        colour = cellnofillcolour;
        pk[y][x] = 0;
    }
    context.fillStyle = colour;
    context.fillRect(cell + x * cell, cell + y * cell, cell - 1, cell - 1);
    LastCell = [x, y];

}

// Function fills/unfills the cell and changes the array element
function fillCellFromArr(CellToFill, context) {
    let cellfillcolour = "red";
    let cell = 28;

    x = CellToFill[0];
    y = CellToFill[1];
    colour = cellfillcolour;
    context.fillStyle = colour;
    context.fillRect(cell + x * cell, cell + y * cell, cell - 1, cell - 1);
}

// Function returns the X and Y of 16x16 array based on mouse position
function getCellByPosition(X, Y) {
    // find the upper left of the canvas
    var canvas = document.getElementById("canvas");
    var offsetX = canvas.offsetLeft;
    var offsetY = canvas.offsetTop;
    // print x and y of canvas
    // console.log(offsetX);
    // console.log(offsetY);
    // print the X and Y of the mouse
    // console.log(X);
    // console.log(Y);
    // find the cell
    var cell = 28;
    var x = Math.floor((X - cell - offsetX) / cell);
    var y = Math.floor((Y - cell - offsetY) / cell);
    // print the cell
    // console.log("your cell is at: ", x, y);
    return [x, y];
}

function randomCanvas() {
    let val;
    for (let x = 0; x < 16; x++) {
        for (let y = 0; y < 16; y++) {
            val = Math.floor(Math.random() * 2);
            // console.log(val);
            pk[y][x] = val;
        }
    }
}

function putPkInTextarea() {
    // convert the pk 2d array to a string
    let pk_string = "";
    for (let i = 0; i < pk.length; i++) {
        for (let j = 0; j < pk[i].length; j++) {
            pk_string += pk[i][j];
        }
    }
    // convert the pk binary string to hex
    let pk_hex = binaryToHex(pk_string);
    // put the pk hex string into the hexTextBox element
    document.getElementById("hexTextBox").value = "0x" + pk_hex;
}



function canvasHandler() {



    drawCanvas();

    // get the canvas element
    var canvasElement = document.getElementById("canvas");

    // get the canvas context
    var ctx = canvasElement.getContext("2d");

    // when user clicks on the canvas
    // fill the cell with red
    canvasElement.onclick = function (e) {
        var cellToFill = getCellByPosition(e.clientX, e.clientY);
        // console.log("Cell to fill: " + cellToFill);
        fillCell(cellToFill, ctx);
        //print the canvas array
        // console.log(pk);
        // convert the pk 2d array to a string
        let pk_string;
        for (let i = 0; i < pk.length; i++) {
            for (let j = 0; j < pk[i].length; j++) {
                pk_string += pk[i][j];
            }
        }
        putPkInTextarea();
    }

    // get the clear button element
    var clearButton = document.getElementById("clear");
    // when a user clicks on the clear button, clear the canvas and the array
    clearButton.onclick = function () {
        // clear the canvas
        ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        drawCanvas();
        // clear the array
        pk = zeroCanvas(pk);
        putPkInTextarea();
    }

    // get the generate button element
    var generateButton = document.getElementById("generate");
    // when a user clicks on the generate button, generate a random array and fill in the canvas at those positions
    generateButton.onclick = function () {
        // clear the canvas
        ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        drawCanvas();

        // generate a random array
        randomCanvas();
        // console.log(pk);
        // fill the canvas with the random array
        for (let x = 0; x < 16; x++) {
            for (let y = 0; y < 16; y++) {
                if (pk[y][x] == 1) {
                    //console.log("Cell to fill: " + [x, y]);
                    fillCellFromArr([x, y], ctx);
                }
            }
        }
        putPkInTextarea();
    }



    //get the inverse button element
    var inverseButton = document.getElementById("inverse");



}

document.addEventListener("DOMContentLoaded", function () {
    canvasHandler();
});