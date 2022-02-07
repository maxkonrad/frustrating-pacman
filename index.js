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

const gameBoard = GameBoard.createGameBoard(gameGrid, LEVEL)


const POWER_PILL_TIME = 10000; // ms
const GLOBAL_SPEED = 80; // ms

let score = 0;
let timer = null;
let gameWin = false;
let powerPillActive = false;
let powerPillTimer = null;

let keydown = false

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
    ghosts.forEach((ghost) => gameBoard.moveObject(ghost));
}

function startGame() {
    startButton.classList.add('hide')
    gameBoard.createMap(LEVEL)
    const pacman = new Pacman(287, 2)
    gameBoard.addObject(287, [pacman.type])
    document.addEventListener('keydown', (e) => {
        pacman.handleRotation(e, gameBoard.objectExists.bind(gameBoard),
        )
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