// Initialize the 5x5 grid with letters
let grid = [
  ["T", "T", "T", "T", "T"],
  ["T", "T", "T", "T", "T"],
  ["T", "T", "T", "T", "T"],
  ["T", "T", "T", "T", "T"],
  ["T", "T", "T", "T", "T"],
];

// Function to update the DOM based on the grid array
function updateBoard() {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      document.getElementById(`cell-${i}-${j}`).textContent = grid[i][j];
    }
  }
}

// Apply a temporary animation class to each cell
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

// Rotate a row in the 3x3 active area (wrap around)
function rotateRow(rowIndex) {
  const row = grid[rowIndex];

  // Select the cells in the row to animate
  const cells = [
    document.getElementById(`cell-${rowIndex}-1`),
    document.getElementById(`cell-${rowIndex}-2`),
    document.getElementById(`cell-${rowIndex}-3`),
  ];

  // Rotate the row visually
  animateCells(cells, "right");

  // Rotate the row in the data model
  setTimeout(() => {
    const rotated = [row[3], row[1], row[2]]; // Rotate right
    grid[rowIndex][1] = rotated[0];
    grid[rowIndex][2] = rotated[1];
    grid[rowIndex][3] = rotated[2];
    updateBoard();
  }, 500); // Allow the animation to complete before updating
}

// Rotate a column in the 3x3 active area (wrap around)
function rotateCol(colIndex) {
  const col = [grid[1][colIndex], grid[2][colIndex], grid[3][colIndex]];

  // Select the cells in the column to animate
  const cells = [
    document.getElementById(`cell-1-${colIndex}`),
    document.getElementById(`cell-2-${colIndex}`),
    document.getElementById(`cell-3-${colIndex}`),
  ];

  // Rotate the column visually
  animateCells(cells, "down");

  // Rotate the column in the data model
  setTimeout(() => {
    const rotated = [col[2], col[0], col[1]]; // Rotate down
    grid[1][colIndex] = rotated[0];
    grid[2][colIndex] = rotated[1];
    grid[3][colIndex] = rotated[2];
    updateBoard();
  }, 500); // Allow the animation to complete before updating
}

// Initial update
updateBoard();
