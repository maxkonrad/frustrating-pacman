import { OBJECT_TYPE, DIRECTIONS } from "./setup";

class Pacman {
    constructor(speed, startPos){
        this.speed = speed
        this.startPos = startPos
        this.dir = null
        this.timer = 0
        this.powerPill = false
        this.rotation = true
    }
}