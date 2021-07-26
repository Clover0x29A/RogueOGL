import phaser from "../lib/phaser.js"
import dungeon from "./dm.js"
import { initiative } from "./randoms.js"

export default class BasicMonster {

    constructor(x,y) {
        this.name = 'Danger'
        this.movePoints = 1
        this.x = x
        this.y = y
        this.actions = 1
        this.tile = 26
        this.hp =  15
        this.type = 'foe'
        this.initiative = initiative()
        dungeon.initializeEntity(this)
    }
    refresh(){
        this.movePoints = 1
        this.actions = 1
    }
    
    turn() {
        let oldX = this.x
        let oldY = this.y
        let pX = dungeon.player.x
        let pY = dungeon.player.y
        let grid = new PF.Grid(dungeon.level)
        let finder = new PF.AStarFinder()
        let path = finder.findPath(oldX, oldY, pX, pY, grid)

        if (this.movePoints > 0) {
            if (path.length > 2) {
                dungeon.moveEntityTo(this, path[1][0], path[1][1])
                this.actions = 0
            }
            this.movePoints -= 1
            
        }
        if(this.actions > 0){
            if(dungeon.distanceBetweenEntities(this, dungeon.player) <= 2){
                dungeon.attackEntity(this, dungeon.player)
            }
            this.actions -= 1
        }
    }
    over() {
        return this.movePoints === 0 && this.actions === 0 && !this.moving
    }

    attack (){
        return 1
    }

    onDestroy() {
        console.log(this.name + ' was killed')
    }

}