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
  if (direction === "right") {
    grid[rowIndex] = [row[4], ...row.slice(0, 4)];
  } else {
    grid[rowIndex] = [...row.slice(1), row[0]];
  }
  updateBoard();
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
  if (direction === "down") {
    grid[0][colIndex] = col[4];
    grid[1][colIndex] = col[0];
    grid[2][colIndex] = col[1];
    grid[3][colIndex] = col[2];
    grid[4][colIndex] = col[3];
  } else {
    grid[0][colIndex] = col[1];
    grid[1][colIndex] = col[2];
    grid[2][colIndex] = col[3];
    grid[3][colIndex] = col[4];
    grid[4][colIndex] = col[0];
  }
  updateBoard();
}

// Add event listeners for drag functionality
function addDragListeners() {
  const cells = document.querySelectorAll(".cell");
  let startX, startY, startRow, startCol;

  cells.forEach((cell) => {
    cell.addEventListener("mousedown", (event) => {
      event.preventDefault(); // Prevent default dragging behavior
      startX = event.clientX;
      startY = event.clientY;
      startRow = parseInt(cell.dataset.row);
      startCol = parseInt(cell.dataset.col);
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    });

    cell.addEventListener("touchstart", (event) => {
      event.preventDefault(); // Prevent default dragging behavior
      const touch = event.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      startRow = parseInt(cell.dataset.row);
      startCol = parseInt(cell.dataset.col);
      document.addEventListener("touchmove", onTouchMove);
      document.addEventListener("touchend", onTouchEnd);
    });
  });

  function onMouseMove(event) {
    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;
    handleDrag(deltaX, deltaY);
  }

  function onMouseUp() {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  }

  function onTouchMove(event) {
    const touch = event.touches[0];
    const deltaX = touch.clientX - startX;
    const deltaY = touch.clientY - startY;
    handleDrag(deltaX, deltaY);
  }

  function onTouchEnd() {
    document.removeEventListener("touchmove", onTouchMove);
    document.removeEventListener("touchend", onTouchEnd);
  }

  function handleDrag(deltaX, deltaY) {
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal drag
      if (deltaX > 50) {
        // Increased threshold to 50
        rotateRow(startRow, "right");
        startX += 80; // Adjust startX to continue dragging
      } else if (deltaX < -50) {
        // Increased threshold to -50
        rotateRow(startRow, "left");
        startX -= 80; // Adjust startX to continue dragging
      }
    } else {
      // Vertical drag
      if (deltaY > 50) {
        // Increased threshold to 50
        rotateCol(startCol, "down");
        startY += 80; // Adjust startY to continue dragging
      } else if (deltaY < -50) {
        // Increased threshold to -50
        rotateCol(startCol, "up");
        startY -= 80; // Adjust startY to continue dragging
      }
    }
  }
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

// Add drag listeners after DOM content is loaded
document.addEventListener("DOMContentLoaded", addDragListeners);
