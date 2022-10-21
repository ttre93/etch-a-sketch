const GRID_DEFAULT_SIZE = 16;

let gridSize = GRID_DEFAULT_SIZE;
let mouseDown = false;


document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);
document.getElementById("resetButton").onclick = resetGrid;

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
        newCell.classList.add("cell");

        newCell.addEventListener("mousedown", changeColor); //change color of the first clicked grid element
        newCell.addEventListener("mouseover", changeColor); 
        grid.appendChild(newCell);
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

function changeColor(e){
    if (e.type === "mouseover" && !mouseDown){
        return;
    } else {
        e.target.style.backgroundColor = "black";
    }
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