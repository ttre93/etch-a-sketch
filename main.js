let gridSize = 64;
let colorMode = "black";
let mouseDown = false;

blackButton = document.getElementById("changeColorBlackButton");
rainbowButton = document.getElementById("changeColorRainbowButton");
grayscaleButton = document.getElementById("changeColorGrayscaleButton");
resetButton = document.getElementById("resetButton");
gridContainer = document.getElementById("gridContainer");
sizeRange = document.getElementById("sizeRange");
sizeValue = document.getElementById("sizeValue");

document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);
document.getElementById("resetButton").onclick = resetGrid;
sizeRange.onchange = changeSize;

blackButton.addEventListener("click", changeColorMode);
rainbowButton.addEventListener("click", changeColorMode);
grayscaleButton.addEventListener("click", changeColorMode);


generateGrid();


function updateSizeValue() {
    sizeValue.textContent = `${gridSize} x ${gridSize}`;
}

function changeSize(){
    gridSize = sizeRange.value;
    resetGrid();
}

function changeActiveButton(e){
    blackButton.classList.remove("activeButton");
    rainbowButton.classList.remove("activeButton");
    grayscaleButton.classList.remove("activeButton");
    if (colorMode === "black"){blackButton.classList.add("activeButton")}
    else if (colorMode === "rainbow"){rainbowButton.classList.add("activeButton")}
    else if (colorMode === "grayscale"){grayscaleButton.classList.add("activeButton")}
}

function generateGrid(){
    grid = document.createElement("div");
    grid.setAttribute("id", "grid");
    gridContainer.appendChild(grid);
    grid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
    
    for (let i = 0; i < gridSize*gridSize; i++){
        newCell = document.createElement("div");
        newCell.setAttribute("id", i);
        newCell.setAttribute("grayLvl", 5);
        newCell.classList.add("cell");
        newCell.addEventListener("mousedown", changeColor);
        newCell.addEventListener("mouseover", changeColor);
        grid.appendChild(newCell);
    }

    updateSizeValue();
}

function changeColor(e){
    if (e.type === "mouseover" && !mouseDown){
        return;
    } else if(colorMode === "black") {
        e.target.style.backgroundColor = "black";
    } else if(colorMode === "rainbow") {
        changeToRainbow(e);
    } else if(colorMode === "grayscale") {
        changeToGrayscale(e);
    }
}

function changeToRainbow(e){
    let R = Math.floor(Math.random() * 256);
    let G = Math.floor(Math.random() * 256);
    let B = Math.floor(Math.random() * 256);
    e.target.style.backgroundColor = `rgb(${R}, ${G}, ${B})`;
}

function changeToGrayscale(e){
    let currentGrayLevel = parseInt(e.target.getAttribute("grayLvl"));
    if (currentGrayLevel < 1){
        e.target.style.backgroundColor = "black";
    } else {
        e.target.setAttribute("grayLvl", currentGrayLevel - 1);
        let shade = parseInt(currentGrayLevel * 40);
        e.target.style.backgroundColor = `rgb(${shade}, ${shade}, ${shade})`;
    }
}

function changeColorMode(e){
    if (e.target.id === "changeColorBlackButton"){colorMode = "black"}
    else if (e.target.id === "changeColorRainbowButton"){colorMode = "rainbow"}
    else if (e.target.id === "changeColorGrayscaleButton"){colorMode = "grayscale"}
    changeActiveButton(e);
}

function removeGrid(){
    let grid = document.getElementById("grid");
    grid.remove();
}

function resetGrid(){
    removeGrid();
    generateGrid();
}