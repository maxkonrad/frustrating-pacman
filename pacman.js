import { OBJECT_TYPE, DIRECTIONS } from './setup';

class Pacman {
  constructor(speed, startPos) {
    this.pos = startPos;
    this.speed = speed;
    this.dir = null;
    this.timer = 0;
    this.powerPill = false;
    this.rotation = true;
    this.bugStatus = false
  }

  shouldMove() {
    // Don't move before a key is pressed
    if (!this.dir) return;

    if (this.timer === this.speed) {
      this.timer = 0;
      return true;
    }
    let percentage = Math.round(Math.random() * 99) + 1
    this.timer++
    
  }

  getNextMove(objectExist) {
    let nextMovePos = this.pos + this.dir.movement;
    // Do we collide with a wall?
    if (
      objectExist(nextMovePos, OBJECT_TYPE.WALL) ||
      objectExist(nextMovePos, OBJECT_TYPE.GHOSTLAIR)
    ) {
      nextMovePos = this.pos;
    }

    return { nextMovePos, direction: this.dir };
  }

  makeMove() {
    const classesToRemove = [OBJECT_TYPE.PACMAN];
    const classesToAdd = [OBJECT_TYPE.PACMAN];

    return { classesToRemove, classesToAdd };
  }

  setNewPos(nextMovePos) {
    this.pos = nextMovePos;
  }

  handleKeyInput = (e, objectExist) => {
    let dir;

    if (e.keyCode >= 37 && e.keyCode <= 40) {
      let percentage = Math.round(Math.random() * 99) + 1
      dir = DIRECTIONS[e.key];
      if(this.bugStatus == false){
        this.dir = dir;
      }
      if (percentage >= 14 && this.bugStatus == true){
        this.dir = dir;
      }
    } 
    const nextMovePos = this.pos + dir.movement;

    if (objectExist(nextMovePos, OBJECT_TYPE.WALL)) return;
  };
}

export default Pacman;
