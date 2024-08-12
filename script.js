document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('board');
  const status = document.getElementById('status');
  const resetBtn = document.getElementById('resetBtn');

  let currentPlayer = 'X';
  let gameBoard = ['', '', '', '', '', '', '', '', ''];
  let gameActive = true;

  const checkWinner = () => {
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let condition of winningConditions) {
      const [a, b, c] = condition;
      if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
        gameActive = false;
        return gameBoard[a];
      }
    }

    if (!gameBoard.includes('')) {
      gameActive = false;
      return 'draw';
    }

    return null;
  };

  const updateStatus = (winner) => {
    if (winner === 'draw') {
      status.textContent = "It's a draw!";
    } else {
      status.textContent = `Player ${winner} wins!`;
    }
  };

  const handleClick = (e) => {
    const cellIndex = parseInt(e.target.dataset.index);
    if (gameBoard[cellIndex] || !gameActive) return;

    gameBoard[cellIndex] = currentPlayer;
    e.target.textContent = currentPlayer;

    const winner = checkWinner();
    if (winner) {
      gameActive = false;
      updateStatus(winner);
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      status.textContent = `Player ${currentPlayer}'s turn`;
    }
  };

  const resetGame = () => {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    status.textContent = "Player X's turn";
    board.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
  };

  // Initialize game board
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleClick);
    board.appendChild(cell);
  }

  resetBtn.addEventListener('click', resetGame);

  // Initialize game
  resetGame();
});
