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

    /**
     * I found this a safer way at the moment to deal
     * with some oddities....I have changed a lot of
     * pieces and might not needmuch if any of this anymore
     */
    setupMoveInfo(player, Move) {
        this.playerOriginX = player.x
        this.playerOriginY = player.y
        this.movePoints = player.movePoints
        this.weaponRange =  player.weaponRange
        this.validXFloor = Move? this.playerOriginX - this.movePoints : this.playerOriginX - this.weaponRange
        this.validXCeil = Move? this.playerOriginX + this.movePoints : this.playerOriginX + this.weaponRange
        this.validYFloor = Move? this.playerOriginY - this.movePoints : this.playerOriginY - this.weaponRange
        this.validYCeil = Move? this.playerOriginY + this.movePoints : this.playerOriginY + this.weaponRange
        this.totalSq = this.validXCeil - this.validXFloor + 1
        this.reset = false

    }

    distanceMoved(x, y){
        let newX = x > this.playerOriginX? x - this.playerOriginX: this.playerOriginX - x
        let newY = y > this.playerOriginY? y - this.playerOriginY: this.playerOriginY - y
        if(newX >= newY) { return newX}
        return newY
    }

    /** clear after completing move or what not **/
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