/**
 * the attempt with this is to be able to press m and it highlight
 * the available squares the PC can move to.  also allow the usage of the keys to 
 * select the tile the PC wants to move to and then move there.  The hope is to be able to 
 * use this class from the cursors in the PlayterCharacter class.  I am wanting to be able
 * to remove the arrows from that move system.
 */


import phaser from "../lib/phaser.js"
import dungeon from './dm.js'

export default class MoveManager {

    constructor() {
        this.playerOriginX  = 0
        this.playerOriginY  = 0
        this.validXFloor    = 0
        this.validXCeil     = 0
        this.validYFloor    = 0
        this.validYCeil     = 0
        this.totalSq        = 0
        this.movePoints     = 0
        this.reset = true
    }

    setupMoveInfo(player) {
        this.playerOriginX = player.x
        this.playerOriginY = player.y
        this.movePoints = player.movePoints
        this.validXFloor = this.playerOriginX - this.movePoints
        this.validXCeil = this.playerOriginX + this.movePoints
        this.validYFloor = this.playerOriginY - this.movePoints
        this.validYCeil = this.playerOriginY + this.movePoints
        this.totalSq = this.validXCeil - this.validXFloor + 1
        this.reset = false

    }

    distanceMoved(x, y){
        let newX = x > this.playerOriginX? x - this.playerOriginX: this.playerOriginX - x
        let newY = y > this.playerOriginY? y - this.playerOriginY: this.playerOriginY - y
        if(newX >= newY) { return newX}
        return newY
    }

    clear(){
        this.playerOriginX  = 0
        this.playerOriginY  = 0
        this.validXFloor    = 0
        this.validXCeil     = 0
        this.validYFloor    = 0
        this.validYCeil     = 0
        this.totalSq        = 0
        this.movePoints     = 0
        this.reset = true
    }

}