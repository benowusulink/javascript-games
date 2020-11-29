/* CHOOSE A GAME SECTION AND NAVBAR */

/* hiding the dice pigame game and tic-tac-toe divs on start up */
document.getElementById("tic-tac-toe-main-div").style.display = "none";
document.getElementById("dice-pig-game-main-div").style.display = "none";

/* function for closing the choose a game div and starting the tic-tac-toe
div */
function ticTacToeStart() {
  document.getElementById("choose-a-game-div").style.display = "none";
  document.getElementById("dice-pig-game-main-div").style.display = "none";
  document.getElementById("tic-tac-toe-main-div").style.display = "block";
}

/* function for closing the choose a game div and starting the dice-pig-game
div */
function pigGameStart() {
  document.getElementById("choose-a-game-div").style.display = "none";
  document.getElementById("tic-tac-toe-main-div").style.display = "none";
  document.getElementById("dice-pig-game-main-div").style.display = "block";
}

/* Event listeners for choose a game section */
document
  .querySelector(".tic-tac-toe-button")
  .addEventListener("click", ticTacToeStart);
document
  .querySelector(".tic-tac-toe-button1")
  .addEventListener("click", ticTacToeStart);
document
  .querySelector(".pig-game-button")
  .addEventListener("click", pigGameStart);
document
  .querySelector(".pig-game-button1")
  .addEventListener("click", pigGameStart);

/* TIC TAC TOE */

/* Caching the h3 html element that displays the games status, 
this is done to store the element within a variable in our 
javacript code so it can be referenced later on within 
our javascript code (it is stored within an ES6 const variable 
which means its value cannot be changed) */

const statusDisplay = document.getElementById("game-status");

/* below the current variables are to be used to track the 
state of the game whilst in play */

/* This variable will be used pause or end the game (It is a 
javacript boolean type) */

let gameActive = true;

/* This variable will be used to track the current player within
the game (It is a javascript string) */

let currentPlayer = "X";

/* This variable will be used to store the current cells within the 
game (It is a javascript array with 9 empty strings with each string 
representing a html div cell element) */

let gameState = ["", "", "", "", "", "", "", "", ""];

/* A variable which holds an array of winning conditions for the game (ES6
 const variable which holds an array or arrays with javascript number 
 types) */
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

/* These functions will be used to display dyamic text to the user whilst 
playing the game (They are ES6 javascript expressions which return ES6 
template strings) */

const winningMessage = () => {
  return `Player ${currentPlayer} has won!`;
};
const drawMessage = () => {
  return `Game ended in a draw!`;
};
const currentPlayerTurn = () => {
  return `It's ${currentPlayer}'s turn`;
};

/* When the game first starts this will set an inital message to indicate 
whose turn it is (It uses the cached h3 element from the beginning and uses 
the text.Content selector to change the text within the h3 element to the string
the function currentPlayer() returns) */

statusDisplay.textContent = currentPlayerTurn();

/* Function declrations which will be used to handle the game */

/* This function is used to update the internal state of the game 
to represent a cell has been played as well as update the UI to 
represent the changes */
function handleCellPlayed(clickedCell, clickedCellIndex) {
  /* Once the cell has been played the value of the gameState 
with the index of the array being the clickedCell value is updated
to now equal the currentPlayer */
  gameState[clickedCellIndex] = currentPlayer;

  /* The html element clicked cells text content equal the value 
of currentPlayer */
  clickedCell.textContent = currentPlayer;
}

/* This function is used to change the player within the game */
function handlePlayerChange() {
  /* This allows us to change the value of the currentPlayer variable.
it uses the shortcut ternary operator which states if the value of 
the current player is "X" then change it to "O" and vice versa */
  currentPlayer = currentPlayer === "X" ? "O" : "X";

  /* This allows us to update the UI to indicate whose turn it is.
It changes the value within h3 tag stored within the variable 
status display to the dyanmic string returned by the 
currentPlayer() function. */
  statusDisplay.textContent = currentPlayerTurn();
}

/* This function is used to check if a player has won or drawn 
match after they have made a play  */
function handleResultValidation() {
  /* This variable is a boolean that is create within the scope of the
function, it will be used to check if a round has been won or not */
  let roundWon = false;

  /* We then use a FOR loop. The parameters of the for loop indicate 
that we want to start the loop at index 0, stop the loop when the 
index is less than or equal to 7 and lasty increment by 1 step */
  for (let i = 0; i <= 7; i++) {
    /* We create a variable to store the looped over data, the data
are the winningConditions variable which hold all winning conditions 
*/
    const winCondition = winningConditions[i];

    /* we create 3 variables which will check our variable gamestate
and use the looped winning conditions to check if they match*/
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];

    /* we then check to see if there is no match within the gamestate 
and the winning conditions, if there is no match it means the game 
hasnt been won yet so just continue !!!!!!!!!!!!!!!CHECK AGAIN!!!!!!!!!!!!!!!!!! */
    if (a === "" || b === "" || c === "") {
      continue;
    }

    /* we then check to see if there are matches within the gamestate 
and the winning conditions, if there is a match it means the game 
 been won yet so change the variable roundWon boolean to true and 
 and exit the loop */

    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  /* Back into the orginal function if the loop returns us the boolean
roundWon then this means the game has been won so we change the status
on the UI to the dyamic string returned by the function winningMessage()
and we also change the gameActive variable boolean to false as the game has 
finished */
  if (roundWon) {
    statusDisplay.textContent = winningMessage();
    gameActive = false;
    return;
  }

  /* We then check if the round has ended with a draw, if it has we will
change the UI to indicate this message and then end the game */

  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    statusDisplay.textContent = drawMessage();
    gameActive = false;
    return;
  }
  /*
If we get to here we know that the no one won the game yet, 
and that there are still moves to be played, so we continue by changing the current player.
*/
  handlePlayerChange();
}

/* This function will check for if a cell has been clicked 
and what to do after the fact */

function handleCellClick(clickedCellEvent) {
  /* Caching the clicked cell event in a variable */
  const clickedCell = clickedCellEvent.target;

  /* Grabbing the clicked cell and using the DOM editor 
getAttribute to get the value of the attribute of the 
clicked cell which defines which cell was clicked within 
our html. We then turn the value of the attribute into 
a Javascript number from a string */
  const clickedCellIndex = Number(clickedCell.getAttribute("data-cell-index"));

  /* Caching the clicked cell event in a variable */

  /* Added javascript If statement to deal with condition that 
if the values within the variable gameState doesnt equal a 
string or if the boolean variable gameActive equals false to
simply return nothing as this means the cell has already been 
clicked or the game is paused */
  if (gameState[clickedCellIndex] !== "" || !gameActive) {
    return;
  }

  /* However if the cell hasnt been clicked and the game is active
then the function should return the following two functions to
allow the game to proceed */

  /*This function handles what happens when a game is active and a 
cell has been clicked */
  handleCellPlayed(clickedCell, clickedCellIndex);

  /* This function checks to see if a user has won the game  */
  handleResultValidation();
}

/* This function is used to restart the game */
function handleRestartGame() {
  /* we first change the gameActive variable boolean to true, this 
inidcates that a game is in session  */
  gameActive = true;

  /* we then change the variable currentPlayer back to the default 
string value which is "X", this indicates it is player 1s turn */
  currentPlayer = "X";

  /* Then we change the gameState array back to default which are empty
strings, this indicates no cells have been clicked and its a new game */
  gameState = ["", "", "", "", "", "", "", "", ""];

  /* Then we change the h3 tags textContent to equal the dynamic string
returned by the function currentPlayerTurn(), This will indicate within
the UI whose turn it is  */
  statusDisplay.textContent = currentPlayerTurn();

  /* Lastly we grab each div cell and loop through each one changing
the textContent to empty strings, This will refresh the UI of the 
game to make sure all the cells are empty */
  document.querySelectorAll(".cell").forEach((cell) => (cell.textContent = ""));
}

/* Event listeners which will be added to each html div cell and the restart
button */

/* First i grab each cell with qyerySelectorAll which returns an array 
of html elements. Then i loop through each cell in the array with a 
for Each loop. For each cell in the array i add an eventListener with the
"click" argument and run the function handleCellClick */
document
  .querySelectorAll(".cell")
  .forEach((cell) => cell.addEventListener("click", handleCellClick));

/* First i grab the button element by its ID name. I then add an eventListener
with the "click" argument which runs the function handleRestartGame */

document
  .getElementById("game-restart")
  .addEventListener("click", handleRestartGame);


/* how to play button */
function howToPlay1 () {

  const alert1 = "The game is played on a grid that's 3 squares by 3 squares." +
  "\nYou are X, your friend is O." +
  "\nPlayers take turns putting their marks in empty squares." +
  "\nThe first player to get 3 of her marks in a row (up, down, across, or diagonally) is the winner." +
  "\nWhen all 9 squares are full, the game is over." +
  "\nIf no player has 3 marks in a row, the game ends in a tie."
     
  alert(alert1);
}


/* How to play event listener (Global) */
document.getElementById("how-to-play").addEventListener("click", howToPlay1)


/* PIG GAME */

/* Global variables for pig game */
let scores, activePlayer, gamePlaying, roundScore;

/* Main function for pig game */
function pigGame() {
  /* variable declaring the scores of both players */
  scores = [0, 0];

  /* variable declaring the active player */
  activePlayer = 0;

  /* variable declaring the round score */
  roundScore = 0;

  /* variable declaring if the game is active */
  gamePlaying = true;

  /* grabbing the html dice element and changing display to none 
for default */
  document.getElementById("dice-image").style.display = "none";

  /* Grabbing and setting the scores to 0 */
  document.querySelector(".overall-score-0").textContent = "0";
  document.querySelector(".overall-score-1").textContent = "0";
  document.querySelector(".current-score-0 h5").textContent = "0";
  document.querySelector(".current-score-1 h5").textContent = "0";

  document
    .querySelector(".pig-game-player-0")
    .classList.remove("current-player");
  document.querySelector(".pig-game-player-0").classList.remove("winner");
  document.querySelector(".pig-game-player-0").classList.add("current-player");
  document
    .querySelector(".pig-game-player-1")
    .classList.remove("current-player");
  document.querySelector(".pig-game-player-1").classList.remove("winner");
}

/* function for the roll dice button */
function rollDice() {
  /* if the gamePlaying variable in the scope is true then run this 
function as it means the game is active */
  if (gamePlaying) {
    /* A variable that stores a random number that will be used to to the 
value of the rolled dice */
    let dice = Math.floor(Math.random() * 6) + 1;

    /* Storing the dice html element within a varaible */
    const diceDOM = document.getElementById("dice-image");

    /* change the html dice element from hidden to block so it can be 
seen on the UI */
    diceDOM.style.display = "block";

    /* changing the image of the dice everytime it is rolled,using ES6 
template strings to use the value of the variable dice to 
generate the src of the image and and value of the dice */
    diceDOM.src = `./assets/pig-game-assets/dice-${dice}.svg`;

    /* extra if statement which updates the round score if if the dice 
value isnt 1, if it is 1 then that means the player lost the run 
and instead we run the nextPlayer function which changes the player 
*/
    if (dice !== 1) {
      /* adding/updating round score */
      roundScore += dice;

      /* updating the UI */
      document.querySelector(
        `.current-score-${activePlayer} h5`
      ).textContent = roundScore;
    } else {
      /* if the dice value is 1 then we run the nextPlayer() function */
      nextPlayer();
    }
  } else {
    /* if the game is not active then we will alert the user to start a new 
game */
    alert("please click new game");
  }
}

/* function for the roll dice button */
function holdButton() {
  /* if statement to add current score to global score, it will run 
only if the variable gameActive is boolean true */
  if (gameActive) {
    /* updating the global score to the value of the round score */
    scores[activePlayer] += roundScore;

    /* updating the UI */
    document.querySelector(`.overall-score-${activePlayer}`).textContent =
      scores[activePlayer];

    /* creating winning score variable */
    var winningScore = 50;

    /* if statement to check to aee of the game has been won */
    if (scores[activePlayer] >= winningScore) {
      /* Change the UI to display the winner */
      document.querySelector(
        `.pig-game-player-text-${activePlayer}`
      ).textContent = "Winner!";

      /* Change the UI of the dice to disappear */
      document.getElementById("dice-image").style.display = "none";

      /* change the status of the game to not active by changing the gameActive 
boolean to false */
      gamePlaying = false;

      /*update UI */
      document
        .querySelector(`.pig-game-player-${activePlayer}`)
        .classList.add("winner");
      document
        .querySelector(`.pig-game-player-${activePlayer}`)
        .classList.remove("active");
    } else {
      /* if the player hasnt won the game run the nextPlayer() function to change 
the player */
      nextPlayer();
    }
  } else {
    alert("please click new game");
  }
}

/* function for the next player */
function nextPlayer() {
  /* change the active player */
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

  /* update round score */
  roundScore = 0;

  document.getElementById(`current-0`).textContent = "0";
  document.getElementById(`current-1`).textContent = roundScore;

  /* hide dice */
  document.getElementById("dice-image").style.display = "none";

  /*update UI */
  document
    .querySelector(".pig-game-player-0")
    .classList.toggle("current-player");
  document
    .querySelector(".pig-game-player-1")
    .classList.toggle("current-player");
}

/* how to play button */
function howToPlay2 () {

     alert("Choose a player to go first."+
          "\nThat player rolls the die and scores as many points as the total shown on the die providing the die doesnt roll a 1." +
           "\nThe player may continue rolling and accumulating points (but risk rolling a 1) or end his turn." +
           "\nIf the player rolls a 1 his turn is over, he loses all points he accumulated that turn, and he passes the die to the next player." +
           "\nPlay passes from player to player until a winner is determined." +
           "\nThe first player to accumulate 50 or more points wins the game.");

}
/* Event Listeners for the buttons in the global scale */
document.querySelector("#new-btn").addEventListener("click", pigGame);
document.querySelector("#roll-btn").addEventListener("click", rollDice);
document.querySelector("#hold-btn").addEventListener("click", holdButton);
document.getElementById("how-to-play-2").addEventListener("click", howToPlay2)

/* starting the main pig game function for the game within the main 
scope for it to boot on launch */
pigGame();
