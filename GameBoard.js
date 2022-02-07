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
            if (CLASS_LIST[square] === OBJECT_TYPE.DOT) this.dotCount++;
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

    rotateObject(pos, degree){
        this.grid[pos].style.transform = `rotate(${degree}deg)`
    }

    moveObject(character){
        if (character.moveCheck()) {
            const nextPos = character.getNextPos(this.objectExists.bind(this))
            if (character.canRotate && (nextPos !== character.pos)){
                this.rotateObject(character.pos, 0)
            }
            if (!character.canRotate) {
                const { classesToRemove, classesToAdd } = character.makeMove()
                this.removeObject(character.pos, classesToRemove)
                this.addObject(nextPos, classesToAdd)
            }
            if (character.canRotate) {
                this.removeObject(character.pos, [character.type])
                this.addObject(nextPos, [character.type])
            }
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