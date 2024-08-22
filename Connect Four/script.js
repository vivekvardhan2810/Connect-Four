document.addEventListener("DOMContentLoaded", () => {
    const columns = 7;
    const rows = 6;
    const board = Array(rows).fill().map(() => Array(columns).fill(null));
    let currentPlayer = "red";

    const gameBoard = document.getElementById("game-board");

    // Create game cells
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.row = row;
            cell.dataset.col = col;
            gameBoard.appendChild(cell);
        }
    }

    gameBoard.addEventListener("click", (event) => {
        if (event.target.classList.contains("cell")) {
            const col = event.target.dataset.col;
            dropDisc(col);
        }
    });

    function dropDisc(col) {
        for (let row = rows - 1; row >= 0; row--) {
            if (!board[row][col]) {
                board[row][col] = currentPlayer;
                const cell = document.querySelector(`.cell[data-row='${row}'][data-col='${col}']`);
                cell.classList.add(currentPlayer);

                if (checkWin(row, col)) {
                    alert(`${currentPlayer} wins!`);
                    resetGame();
                } else {
                    currentPlayer = currentPlayer === "red" ? "yellow" : "red";
                }
                break;
            }
        }
    }

    function checkWin(row, col) {
        return checkDirection(row, col, 1, 0) || // Horizontal
               checkDirection(row, col, 0, 1) || // Vertical
               checkDirection(row, col, 1, 1) || // Diagonal /
               checkDirection(row, col, 1, -1);  // Diagonal \
    }

    function checkDirection(row, col, rowDir, colDir) {
        let count = 1;
        count += countDiscs(row, col, rowDir, colDir);
        count += countDiscs(row, col, -rowDir, -colDir);
        return count >= 4;
    }

    function countDiscs(row, col, rowDir, colDir) {
        let r = row + rowDir;
        let c = col + colDir;
        let count = 0;
        while (r >= 0 && r < rows && c >= 0 && c < columns && board[r][c] === currentPlayer) {
            count++;
            r += rowDir;
            c += colDir;
        }
        return count;
    }

    function resetGame() {
        board.forEach(row => row.fill(null));
        document.querySelectorAll(".cell").forEach(cell => {
            cell.classList.remove("red", "yellow");
        });
        currentPlayer = "red";
    }
});