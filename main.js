// Select the element to display game messages
const statusDisplay = document.querySelector('.game--status');

// Initialize the game state
let gameActive = true; // Indicates if the game is currently active or over
let currentPlayer = "X"; // The current player, starting with "X"
let gameState = ["", "", "", "", "", "", "", "", ""]; // Represents the current state of the game board

// Functions to display game messages
const winningMessage = () => `Player ${currentPlayer} has won!`; // Message for when a player wins
const drawMessage = () => `Game ended in a draw!`; // Message for when the game ends in a draw
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`; // Message to show which player's turn it is

// Display the initial message for the current player's turn
statusDisplay.innerHTML = currentPlayerTurn();

// Add event listeners for each cell and the restart button
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);

// Function to handle when a cell is clicked
function handleCellClick(clickedCellEvent) {   
    const clickedCell = clickedCellEvent.target; // Get the cell element that was clicked
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index')); // Get the index of the clicked cell

    // If the cell is already filled or the game is not active, exit the function
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    // Update the game state and validate the result
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

// Function to handle the game state when a cell is played
function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer; // Update the game state array with the current player's mark
    clickedCell.innerHTML = currentPlayer; // Display the current player's mark in the clicked cell

    // Apply styles directly to the clicked cell based on the current player
    if (currentPlayer === "X") {
        clickedCell.style.color = "#FDD835"; // Yellow color for "X"
        clickedCell.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.3)'; // Subtle shadow for better visibility
    } else if (currentPlayer === "O") {
        clickedCell.style.color = '#FF5722'; // Orange color for "O"
        clickedCell.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.3)'; // Subtle shadow for better visibility
    }
}

// Define all possible winning conditions in the game
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal winning conditions
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical winning conditions
    [0, 4, 8], [2, 4, 6] // Diagonal winning conditions
];

// Function to check if there is a winner or a draw
function handleResultValidation() {
    let roundWon = false; // Variable to track if the current round is won

    // Loop through all possible winning conditions
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i]; // Get the current win condition
        let a = gameState[winCondition[0]]; // Get the value at the first cell in the winning condition
        let b = gameState[winCondition[1]]; // Get the value at the second cell
        let c = gameState[winCondition[2]]; // Get the value at the third cell
        
        // If any of these cells are empty, continue to the next iteration
        if (a === '' || b === '' || c === '') {
            continue;
        }

        // If all three cells match, the round is won
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) { // If a round is won
        statusDisplay.innerHTML = winningMessage(); // Display the winning message
        statusDisplay.style.color = "#FDD835"; // Set the color for the winning message (yellow)
        gameActive = false; // Set the game to inactive
        return;
    }

    // Check for a draw if there are no empty cells left
    let roundDraw = !gameState.includes(""); 
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage(); // Display the draw message
        statusDisplay.style.color = "#FDD835"; // Set the color for the draw message (yellow)
        gameActive = false; // Set the game to inactive
        return;
    }

    // If no winner and no draw, change the player
    handlePlayerChange();
}

// Function to switch players
function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X"; // Switch the player from "X" to "O" or vice versa
    statusDisplay.innerHTML = currentPlayerTurn(); // Update the game message to reflect the new player's turn
    statusDisplay.style.color = "#FFFFFF"; // Reset the message color for the next player's turn
}

// Function to restart the game
function handleRestartGame() {
    gameActive = true; // Reactivate the game
    currentPlayer = "X"; // Reset the current player to "X"
    gameState = ["", "", "", "", "", "", "", "", ""]; // Reset the game state array to empty
    statusDisplay.innerHTML = currentPlayerTurn(); // Reset the game status message
    statusDisplay.style.color = "#FFFFFF"; // Reset color for the player turn message

    // Clear all the cells on the board
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}
