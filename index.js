import { LEVEL, OBJECT_TYPE } from "./setup.js";
import GameBoard from "./GameBoard.js"

const gameMap = document.getElementById('game');
const scoreTable = document.getElementById('score');
const startButton = document.getElementById('start-button');

const POWER_PILL_TIME = 15000
const GLOBAL_SPEED = 80

let score = 0;
let timer = null;
let gameWin = false;
let powerPillActive = false;
let powerPillTimer = null;

const gameBoard = GameBoard.createGameBoard(gameMap, LEVEL)

