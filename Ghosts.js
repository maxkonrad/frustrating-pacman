import { DIRECTIONS, OBJECT_TYPE } from './setup';

class Ghost{
    constructor(speed = 5, startPos, movement, name){
        this.speed = speed
        this.pos = startPos
        this.movement = movement
        this.name = name
        this.dir = DIRECTIONS.RIGHT
        this.timer = 0
        this.isScared = false
        this.canRotate = false
    }

    moveCheck(){
        if (this.timer === this.speed) {
            this.timer = 0
            return true
        }
        this.timer++
    }

    getNextPos(objectExists){
        const { nextPos, direction } = this.movement(this.pos, this.dir, objectExists)
        this.dir = direction
        return nextPos
    }

    makeMove(){
        const classesToRemove = [OBJECT_TYPE.GHOST, OBJECT_TYPE.SCARED, this.name]
        let classesToAdd = [OBJECT_TYPE.GHOST, this.name]
        if (this.isScared) classesToAdd = [...classesToAdd, OBJECT_TYPE.SCARED]
        return { classesToRemove, classesToAdd }
    }
}

export default Ghost