import { LEVEL, OBJECT_TYPE } from './setup.js'
import GameBoard from './GameBoard.js'
import Pacman from './pacman.js'

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

function gameLoop(pacman) {
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
    gameBoard.rotateObject(pacman)
}

function startGame() {
    startButton.classList.add('hide')
    gameBoard.createMap(LEVEL)
    const pacman = new Pacman(287, 2)
    gameBoard.addObject(287, [pacman.type])
    document.addEventListener('keydown', (e) => {
        pacman.handleRotation(e, gameBoard.objectExists.bind(gameBoard)
        )
    })
    timer = setInterval(() => gameLoop(pacman), GLOBAL_SPEED)
}



startButton.addEventListener('click', startGame)