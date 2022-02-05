import { GRID_SIZE, CELL_SIZE, OBJECT_TYPE, CLASS_LIST } from "./setup.js";

class GameBoard {
    constructor(DOM_GRID){
        this.dotCount = 0,
        this.grid = [],
        this.DOM_GRID = DOM_GRID
    }

    showGameStatus(gameWin){
        const div = document.createElement('div')
        div.classList.add('game-status')
        div.innerHTML = `${gameWin ? 'WIN' : 'GAME OVER'}`
        this.DOM_GRID.appendChild(div);
    }

    createGrid(level){
        this.dotCount = 0;
        this.grid = [];
        this.DOM_GRID.innerHTML = ''
        this.DOM_GRID.style.cssText = `grid-template-columns: repeat(${GRID_SIZE}, ${CELL_SIZE}px)`
        level.forEach(square => {
            const squareDiv = document.createElement('div')
            squareDiv.classList.add('square', CLASS_LIST[square])
            squareDiv.style.cssText = `width:${CELL_SIZE}px; height:${CELL_SIZE}px`
            this.DOM_GRID.appendChild(squareDiv)
            this.grid.push(squareDiv);
            if (CLASS_LIST[square] === OBJECT_TYPE.DOT) {
                this.dotCount++
            }
        });
    }

    addObject(pos, classes){
        this.grid[pos].classList.add(...classes)
    }
    removeObject(pos, classes){
        this.grid[pos].classList.remove(...classes)
    }
    objectExist(pos, object){
        return this.grid[pos].classList.contains(object)
    }

    rotateDiv(pos, deg){
         this.grid[pos].style.transform = `rotate(${deg}deg)`
    }

    static createGameBoard(DOMGrid, level){
        const board = new this(DOMGrid)
        board.createGrid(level)
        return board
    }
}

export default GameBoard;