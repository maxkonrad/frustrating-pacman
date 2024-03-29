import { LEVEL, OBJECT_TYPE } from './setup';
import { randomMovement, huntMovement } from './ghostMovement';


// Classes
import GameBoard from './GameBoard';
import Pacman from './pacman.js';
import Ghost from './Ghosts';
// Sounds
import soundDot from './sounds/munch.wav';
import soundPill from './sounds/pill.wav';
import soundGameStart from './sounds/game_start.wav';
import soundGameOver from './sounds/death.wav';
import soundGhost from './sounds/eat_ghost.wav';
// Dom Elements
const gameGrid = document.querySelector('#game');
const scoreTable = document.querySelector('#score');
const startButton = document.querySelector('#start-button');
// Game constants
const POWER_PILL_TIME = 4000; // ms
const GLOBAL_SPEED = 80; // ms
const gameBoard = GameBoard.createGameBoard(gameGrid, LEVEL);
// Initial setup
let score = 0;
let timer = null;
let gameWin = false;
let powerPillActive = false;
let powerPillTimer = null;
let messageBool = true;

let alertBool = true

// --- AUDIO --- //
function playAudio(audio) {
  const soundEffect = new Audio(audio);
  soundEffect.play();
}

// --- GAME CONTROLLER --- //
function gameOver(pacman, grid) {
  playAudio(soundGameOver);

  document.removeEventListener('keydown', (e) =>
    pacman.handleKeyInput(e, gameBoard.objectExist.bind(gameBoard))
  );

  gameBoard.showGameStatus(gameWin);

  clearInterval(timer);
  // Show startbutton
  startButton.classList.remove('hide');
}

function checkCollision(pacman, ghosts) {
  const collidedGhost = ghosts.find((ghost) => pacman.pos === ghost.pos);

  if (collidedGhost) {
    if (pacman.powerPill) {
      playAudio(soundGhost);
      gameBoard.removeObject(collidedGhost.pos, [
        OBJECT_TYPE.GHOST,
        OBJECT_TYPE.SCARED,
        collidedGhost.name
      ]);
      collidedGhost.pos = collidedGhost.startPos;
      score += 100;
    } else {
      gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.PACMAN]);
      gameBoard.rotateDiv(pacman.pos, 0);
      gameOver(pacman, gameGrid);
    }
  }
}

function gameLoop(pacman, ghosts) {
  // 6. Check if Pacman eats a power pill
  if (gameBoard.objectExist(pacman.pos, OBJECT_TYPE.PILL)) {
    playAudio(soundPill);
    
    gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.PILL]);

    pacman.powerPill = true;
    score += 50;

    clearTimeout(powerPillTimer);
    
    powerPillTimer = setTimeout(() => {
      pacman.powerPill = false
      ghosts.forEach((ghost) => (ghost.isScared = false));
  }, POWER_PILL_TIME);
  }
   // 7. Change ghost scare mode depending on powerpill
  if (pacman.powerPill != powerPillActive) {
    powerPillActive = pacman.powerPill;
    ghosts.forEach((ghost) => (ghost.isScared = pacman.powerPill));
  }
  // 1. Move Pacman
  gameBoard.moveCharacter(pacman);
  // 2. Check Ghost collision on the old positions
  checkCollision(pacman, ghosts);
  //2.1 Check ghost move and bugs
  if (gameBoard.dotCount == 160) {
    pacman.bugStatus = true
  }
  // 3. Move ghosts
  ghosts.forEach((ghost) => gameBoard.moveCharacter(ghost));
  // 4. Do a new ghost collision check on the new positions
  checkCollision(pacman, ghosts);
  // 5. Check if Pacman eats a dot
  if (gameBoard.objectExist(pacman.pos, OBJECT_TYPE.DOT)) {

    playAudio(soundDot);

    gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.DOT]);
    // Remove a dot
    gameBoard.dotCount--;
    // Add Score
    score += 10;
  }
  // 8. Check if all dots have been eaten
  if (gameBoard.dotCount === 0) {
    gameWin = true;
    gameOver(pacman, gameGrid);
  }
  // 9. Show new score
  scoreTable.innerHTML = score;
  
}

function startGame() {
  LEVEL[84] = 7
  LEVEL[96] = 7
  LEVEL[376] = 7
  LEVEL[364] = 7
  playAudio(soundGameStart);
  gameWin = false;
  powerPillActive = false;
  score = 0;

  startButton.classList.add('hide');

  gameBoard.createGrid(LEVEL);

  const pacman = new Pacman(2, 287);
  gameBoard.addObject(287, [OBJECT_TYPE.PACMAN]);
  document.addEventListener('keydown', (e) =>
    pacman.handleKeyInput(e, gameBoard.objectExist.bind(gameBoard))

  );


  const ghosts = [
    new Ghost(5, 188, huntMovement, OBJECT_TYPE.BLINKY, pacman),
    new Ghost(4, 209, huntMovement, OBJECT_TYPE.PINKY, pacman),
    new Ghost(3, 230, huntMovement, OBJECT_TYPE.INKY, pacman),
    new Ghost(2, 251, huntMovement, OBJECT_TYPE.CLYDE, pacman)
  ];
  
  // Start Research Timeouts
  setTimeout(() => {
    alert("The game is now over. Please wait to be redirected. Do not press any key or close any window.")
    gameGrid.remove();
    startButton.remove();
  }, 300000)

  setTimeout(() => {
    if(messageBool){
    alert("Message from the experimenter: Please focus on the task. For this experiment to work, it is important that you score as many points as possible! So far, you are doing worse than 95% of the participants...")
    }
    messageBool = false;
  }, 150100)
  
  // Gameloop
  timer = setInterval(() => gameLoop(pacman, ghosts), GLOBAL_SPEED);
}

// Initialize game
startButton.addEventListener('click', startGame);

function showPage(){

    document.getElementById('loading-screen').style.display = 'none';
    document.getElementById('wrapper').style.display = 'flex';
}

setTimeout(showPage, Math.floor(Math.random() * 5000));
