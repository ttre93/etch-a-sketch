const GRID_DEFAULT_SIZE = 16;

let gridSize = GRID_DEFAULT_SIZE;
let colorMode = "black";
let mouseDown = false;

document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);
document.getElementById("resetButton").onclick = resetGrid;
document.getElementById("changeColorBlackButton").onclick = () => (colorMode = "black");
document.getElementById("changeColorRainbowButton").onclick = () => (colorMode = "rainbow");
document.getElementById("changeColorGrayscaleButton").onclick = () => (colorMode = "grayscale");


gridContainer = document.getElementById("gridContainer");

generateGrid();

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
        newCell.addEventListener("mousedown", changeColor); //change color of the first clicked grid element
        newCell.addEventListener("mouseover", changeColor);
        grid.appendChild(newCell);
    }
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
        let shade = parseInt(currentGrayLevel * 50);
        e.target.style.backgroundColor = `rgb(${shade}, ${shade}, ${shade})`;
    }
}

function removeGrid(){
    let grid = document.getElementById("grid");
    grid.remove();
}

function resetGrid(){
    removeGrid();
    generateGrid();
}

/*
gridContainer.innerHTML = ''



let tubirimuft = document.getElementById("grid");
tubirimuft.remove();*/

/*const GRID_DEFAULT_SIZE = 16;

let gridSize = GRID_DEFAULT_SIZE;

gridDiv = document.getElementById("gridContainer");

gridDiv.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
gridDiv.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

for (let i = 0; i < gridSize*gridSize; i++){
    newCell = document.createElement("div");
    newCell.setAttribute("id", i);
    newCell.classList.add("cell");
    newCell.textContent = i;
    console.log("cell created");
    gridDiv.appendChild(newCell);
}
*/