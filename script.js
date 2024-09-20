// Initialize the 5x5 grid with letters
let grid = [
  ["T", "T", "B", "T", "T"],
  ["T", "T", "T", "T", "T"],
  ["T", "A", "T", "B", "T"],
  ["T", "T", "B", "T", "T"],
  ["T", "G", "T", "G", "T"],
];

// Function to update the DOM based on the grid array
function updateBoard() {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      document.getElementById(`cell-${i}-${j}`).textContent = grid[i][j];
    }
  }
}

// Rotate a row in the 3x3 active area (wrap around)
function rotateRow(rowIndex) {
  const row = grid[rowIndex];
  // Only rotate the 3x3 part (indices 1, 2, 3)
  const rotated = [row[3], row[1], row[2]]; // Rotate right
  grid[rowIndex][1] = rotated[0];
  grid[rowIndex][2] = rotated[1];
  grid[rowIndex][3] = rotated[2];
  updateBoard();
}

// Rotate a column in the 3x3 active area (wrap around)
function rotateCol(colIndex) {
  const col = [grid[1][colIndex], grid[2][colIndex], grid[3][colIndex]];
  // Rotate column (wrap around)
  const rotated = [col[2], col[0], col[1]];
  grid[1][colIndex] = rotated[0];
  grid[2][colIndex] = rotated[1];
  grid[3][colIndex] = rotated[2];
  updateBoard();
}

// Check if all rows and columns in the 3x3 area form valid words
function checkValidWords() {
  const validWords = ["CAT", "DOG", "TAP"]; // Use a real dictionary

  // Check rows (1, 2, 3)
  for (let i = 1; i <= 3; i++) {
    const rowWord = grid[i].slice(1, 4).join("");
    if (!validWords.includes(rowWord)) return false;
  }

  // Check columns (1, 2, 3)
  for (let j = 1; j <= 3; j++) {
    const colWord = [grid[1][j], grid[2][j], grid[3][j]].join("");
    if (!validWords.includes(colWord)) return false;
  }

  return true;
}

// Initial update
updateBoard();
