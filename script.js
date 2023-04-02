let gridNum = 5;
const pad = document.querySelector(".sketchpad");
const gridSizeBox = document.querySelector(".gridSize");
const changeGridSizeBtn = document.querySelector("#grid");
const rgb = document.querySelector("#rgb");
gridSizeBox.textContent = `Current grid size: ${gridNum} x ${gridNum}`;
const clearBtn = document.querySelector("#clear")
let squareColor = "black";
let rgbStatus = "off";


//Allow gridsize change
changeGridSizeBtn.addEventListener("click", function () {
    let userNum = window.prompt("Please type desired squares per side (MAX: 100)", "100");
    if (userNum == null || userNum <= 0 || userNum > 100 || isNaN(userNum)) {
        alert("Please type a number between 1 and 100")
        return;
    } else {
        gridNum = userNum;
        emptyGrid(pad);
        padFill(gridNum);
        gridSizeBox.textContent = `Current grid size: ${gridNum} x ${gridNum}`;
    }

});

//clear pad before changing gridsize
const emptyGrid = function removeAllChildNodes(pad) {
    while (pad.firstChild) {
        pad.removeChild(pad.firstChild);
    }
}


// Clear pad on button press
const clearPad = function () {
    const cleanSquare = Array.from(document.querySelectorAll('.column'));
    cleanSquare.forEach(square => square.style.backgroundColor = "rgb(180, 204, 204)");
}


clearBtn.addEventListener("click", function () {
    clearPad();
})

//Change colors to random RBG value on click
rgb.addEventListener("click", function () {
const onOff = document.querySelector("#onOff");
    if (rgbStatus == "off") {
        rgbStatus = "on";
        onOff.style.color = "#03ff03";
        
    } else if (rgbStatus == "on") {
        rgbStatus = "off";
        onOff.style.color = "black";
    }
    console.log(rgbStatus);
})


//Generate random color for squares
const randColor = function () {
    const R = Math.floor((Math.random() * 255) + 1);
    const G = Math.floor((Math.random() * 255) + 1);
    const B = Math.floor((Math.random() * 255) + 1);
    return `rgb(${R}, ${G}, ${B})`
}


// Generate squares to fill in the pad later
let addSquares = function () {
    const row = document.createElement("div");
    row.classList.add("row");
    pad.appendChild(row)
    for (let i = 0; i < gridNum; i++) {
        const column = document.createElement("div");
        column.classList.add("column");
        row.appendChild(column);
    }

//change square color on mouse enter
    const squares = Array.from(document.querySelectorAll('.column'));
    squares.forEach(square => square.addEventListener("mouseenter", function (event) {
        if (rgbStatus == "off") {
            event.target.style.backgroundColor = squareColor;

        } else event.target.style.backgroundColor = randColor();

    }))
}

// take number of squres to be added and fill the pad
let padFill = function (num) {
    for (let i = 0; i < num; i++) {
        addSquares();
    }
}

//Use provided number to fill pad with squares
padFill(gridNum);
