import { LEVEL, OBJECT_TYPE } from './setup.js'
import GameBoard from './GameBoard.js'
import Pacman from './pacman.js'
import Ghost from './Ghosts'

import { randomMovement } from './ghostMovement';

import soundDot from './sounds/munch.wav';
import soundPill from './sounds/pill.wav';
import soundGameStart from './sounds/game_start.wav';
import soundGameOver from './sounds/death.wav';
import soundGhost from './sounds/eat_ghost.wav';

const startButton = document.getElementById("start-button")
const gameGrid = document.getElementById('game')
const scoreTable = document.querySelector('#score');

const gameBoard = GameBoard.createGameBoard(gameGrid, LEVEL)


const POWER_PILL_TIME = 10000; // ms
const GLOBAL_SPEED = 80; // ms

let score = 0;
let timer = null;
let gameWin = false;
let powerPillActive = false;
let powerPillTimer = null;

let keydown = false

function playAudio(audio) {
    const soundEffect = new Audio(audio);
    soundEffect.play();
  }
  
  function gameOver(pacman, grid) {
    playAudio(soundGameOver);
  
    document.removeEventListener('keydown', (e) =>
      pacman.handleKeyInput(e, gameBoard.objectExists.bind(gameBoard))
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
        gameBoard.rotateObject(pacman.pos, 0);
        gameOver(pacman, gameGrid);
      }
    }
  }

function gameLoop(pacman, ghosts) {
    gameBoard.rotateObject(pacman.pos, -pacman.rotation)
    document.addEventListener('keydown', (e) => {
        if (e.code == 'Space' && keydown) {
        keydown = false
        gameBoard.moveObject(pacman)
        }
        else return
    })
    document.addEventListener('keyup', (e) => {
        if (e.code == 'Space') {
            keydown = true
        }
        else return
    })
    checkCollision(pacman, ghosts)
    ghosts.forEach((ghost) => gameBoard.moveObject(ghost))
    checkCollision(pacman, ghosts)

    if (gameBoard.objectExists(pacman.pos, OBJECT_TYPE.DOT)) {
        playAudio(soundDot);

        gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.DOT]);
        // Remove a dot
        gameBoard.dotCount--;
        // Add Score
        score += 10;
      }

      if (gameBoard.objectExists(pacman.pos, OBJECT_TYPE.PILL)) {
        playAudio(soundPill);
    
        gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.PILL]);
    
        pacman.powerPill = true;
        score += 50;
    
        clearTimeout(powerPillTimer);
        powerPillTimer = setTimeout(() => (pacman.powerPill = false), POWER_PILL_TIME);
      }

      if (pacman.powerPill !== powerPillActive) {
        powerPillActive = pacman.powerPill;
        ghosts.forEach((ghost) => (ghost.isScared = pacman.powerPill));
      }

      if (gameBoard.dotCount === 0) {
        gameWin = true;
        gameOver(pacman, gameGrid);
      }

      scoreTable.innerHTML = score;
}

function startGame() {
    playAudio(soundGameStart)

    startButton.classList.add('hide')
    gameBoard.createMap(LEVEL)
    const pacman = new Pacman(287, 2)
    gameBoard.addObject(287, [pacman.type])
    document.addEventListener('keydown', (e) => {
        pacman.handleRotation(e, gameBoard.objectExists.bind(gameBoard))
    })

    const ghosts = [
        new Ghost(5, 188, randomMovement, OBJECT_TYPE.BLINKY),
        new Ghost(4, 209, randomMovement, OBJECT_TYPE.PINKY),
        new Ghost(3, 230, randomMovement, OBJECT_TYPE.INKY),
        new Ghost(2, 251, randomMovement, OBJECT_TYPE.CLYDE)
    ]

    timer = setInterval(() => gameLoop(pacman, ghosts), GLOBAL_SPEED)
}

startButton.addEventListener('click', startGame)


function showPage(){
    document.getElementById('loading-screen').style.display = 'none';
    document.getElementById('wrapper').style.display = 'flex';
}

setTimeout(showPage, Math.floor(Math.random() * 5000));