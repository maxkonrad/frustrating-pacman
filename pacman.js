import { OBJECT_TYPE, DIRECTIONS, KEYS} from "./setup.js"

class Pacman  {
    constructor(startPos, speed){
        this.speed = speed
        this.canRotate = true
        this.rotation = 0
        this.type = OBJECT_TYPE.PACMAN
        this.timer = 0
        this.dir = null
        this.pos = startPos
    }

    moveCheck(){
        if (this.timer === this.speed) {
            this.timer = 0;
            return true;
          }
          this.timer++;
    }

    handleRotation = (e, objectExists) => {
        if (e.key == 'Shift'){
            this.rotation += KEYS[e.code].rotation 
        }
        else {
            return
        }
        const nextPos = this.pos + this.dir
        if (objectExists(nextPos, OBJECT_TYPE.WALL)) {
            return
        }
    }
    
    getNextPos(objectExists){
        if (this.rotation == 90 || this.rotation == -270) {
            this.dir = DIRECTIONS.DOWN}
        if (this.rotation == 0 || this.rotation == 360) {
            this.dir = DIRECTIONS.RIGHT}
        if (this.rotation == 270 || this.rotation == -90) {
            this.dir = DIRECTIONS.UP}
        if (this.rotation == 180 || this.dir == -180) {
            this.dir = DIRECTIONS.LEFT}
        this.rotation = this.rotation % 360
        let nextPos = this.pos + this.dir
        if (objectExists(nextPos, OBJECT_TYPE.WALL) || objectExists(nextPos, OBJECT_TYPE.GHOSTLAIR)){
            nextPos = this.pos
        }
        
        return nextPos
    }
}

export default Pacman