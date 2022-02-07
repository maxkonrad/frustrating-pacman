import { GRID_SIZE, CELL_SIZE, OBJECT_TYPE, CLASS_LIST } from './setup.js';

class GameBoard{
    constructor(map){
        this.grid = []
        this.dotCount = 0;
        this.map = map
    }
    createMap(level){
        this.dotCount = 0
        this.grid = []
        this.map.innerHTML = ''
        this.map.style.cssText = `grid-template-columns: repeat(${GRID_SIZE}, ${CELL_SIZE}px)`
        level.forEach(square => {
            const newSquare = document.createElement('div')
            newSquare.classList.add('square', CLASS_LIST[square])
            newSquare.style.cssText = `width: ${CELL_SIZE}px; height: ${CELL_SIZE}px`
            this.map.appendChild(newSquare)
            this.grid.push(newSquare)
        });
    }


    addObject(pos, objectClasses){
        this.grid[pos].classList.add(...objectClasses)
    }

    removeObject(pos, objectClasses){
        this.grid[pos].classList.remove(...objectClasses)
    }

    objectExists(nextPos, object){
        return this.grid[nextPos].classList.contains(object)
    }

    rotateObject(character){
        let nextPos = character.getNextPos(this.objectExists.bind(this))
        if (nextPos == character.pos) {   
            this.grid[nextPos].style.transform = `rotate(${character.rotation}deg)`
        }
        else{
            this.grid[nextPos].style.transform = `rotate(${character.rotation}deg)`
            this.grid[character.pos].style.transform = `rotate(0)`
        }
    }

    moveObject(character){
        if (true) {
            const nextPos = character.getNextPos(this.objectExists.bind(this))
            this.removeObject(character.pos, [character.type])
            this.addObject(nextPos, [character.type])
            // if (character.canRotate && nextPos !== this.pos) {
            //     this.rotateObject(nextPos, character.rotation)
            //     this.rotateObject(character.pos, 0);
            // }
            // else{
            //    
            // }
            character.pos = nextPos
        }
    }

    static createGameBoard(map, level){
        const board = new this(map)
        board.createMap(level)
        return board
    }


}

export default GameBoard