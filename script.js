// Initialize the 5x5 grid with letters
let grid = [
  ["A", "B", "C", "D", "E"],
  ["F", "G", "H", "I", "J"],
  ["K", "L", "M", "N", "O"],
  ["P", "Q", "R", "S", "T"],
  ["U", "V", "W", "X", "Y"],
];

// Function to update the DOM based on the grid array
function updateBoard() {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      document.getElementById(`cell-${i}-${j}`).textContent = grid[i][j];
    }
  }
}

// Rotate a full row (including all 5 cells, wrapping around)
function rotateRow(rowIndex, direction) {
  const row = grid[rowIndex];
  const cells = Array.from(
    document.querySelectorAll(`.cell[data-row="${rowIndex}"]`)
  );

  // Apply temporary animation class based on direction
  animateCells(cells, direction === "right" ? "right" : "left");

  setTimeout(() => {
    if (direction === "right") {
      // Move the last element to the front (right rotation)
      grid[rowIndex] = [row[4], ...row.slice(0, 4)];
    } else {
      // Move the first element to the back (left rotation)
      grid[rowIndex] = [...row.slice(1), row[0]];
    }
    updateBoard();
  }, 500); // Animation duration is 500ms
}

// Rotate a full column (including all 5 cells, wrapping around)
function rotateCol(colIndex, direction) {
  const col = [
    grid[0][colIndex],
    grid[1][colIndex],
    grid[2][colIndex],
    grid[3][colIndex],
    grid[4][colIndex],
  ];
  const cells = Array.from(
    document.querySelectorAll(`.cell[data-col="${colIndex}"]`)
  );

  // Apply temporary animation class based on direction
  animateCells(cells, direction === "down" ? "down" : "up");

  setTimeout(() => {
    if (direction === "down") {
      // Move the last element to the top (down rotation)
      grid[0][colIndex] = col[4];
      grid[1][colIndex] = col[0];
      grid[2][colIndex] = col[1];
      grid[3][colIndex] = col[2];
      grid[4][colIndex] = col[3];
    } else {
      // Move the first element to the bottom (up rotation)
      grid[0][colIndex] = col[1];
      grid[1][colIndex] = col[2];
      grid[2][colIndex] = col[3];
      grid[3][colIndex] = col[4];
      grid[4][colIndex] = col[0];
    }
    updateBoard();
  }, 500); // Animation duration is 500ms
}

// Apply a temporary animation class to each cell in the row or column
function animateCells(cells, direction) {
  cells.forEach((cell) => {
    cell.classList.add(`animate-${direction}`);
    cell.addEventListener(
      "animationend",
      () => {
        cell.classList.remove(`animate-${direction}`);
      },
      { once: true }
    );
  });
}

// Add event listeners for drag functionality
function addDragAndDropListeners() {
  const cells = document.querySelectorAll(".cell");

  cells.forEach((cell) => {
    cell.setAttribute("draggable", "true");

    cell.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", event.target.id);
    });

    cell.addEventListener("dragover", (event) => {
      event.preventDefault();
    });

    cell.addEventListener("drop", (event) => {
      event.preventDefault();
      const draggedCellId = event.dataTransfer.getData("text/plain");
      const draggedCell = document.getElementById(draggedCellId);
      const draggedRow = parseInt(draggedCell.dataset.row);
      const draggedCol = parseInt(draggedCell.dataset.col);
      const targetRow = parseInt(event.target.dataset.row);
      const targetCol = parseInt(event.target.dataset.col);

      // Determine if the drop is valid for row or column rotation
      if (draggedRow === targetRow) {
        // Rotate row
        const direction = draggedCol < targetCol ? "right" : "left";
        rotateRow(draggedRow, direction);
      } else if (draggedCol === targetCol) {
        // Rotate column
        const direction = draggedRow < targetRow ? "down" : "up";
        rotateCol(draggedCol, direction);
      }
    });
  });
}

// Highlight the middle 3x3 cells
const highlightCells = () => {
  for (let i = 1; i < 4; i++) {
    for (let j = 1; j < 4; j++) {
      document.getElementById(`cell-${i}-${j}`).classList.add("highlight");
    }
  }
};

// Call the highlight function on initial load
highlightCells();

// Initial update
updateBoard();

// Add drag and drop listeners after DOM content is loaded
document.addEventListener("DOMContentLoaded", addDragAndDropListeners);
