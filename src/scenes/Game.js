import Phaser from '../lib/phaser.js'
import dungeon from '../manager/dm.js'
import turnManager from '../manager/tm.js'
import PlayerCharacter from '../manager/pm.js'
import BasicMonster from '../manager/monster.js'
import CursorSprite from '../manager/cursor.js'

export default class Game extends Phaser.Scene {

   
    constructor() {
        super('game')
        this.lastCall = Date.now()
        this.interval = 150
    }

    preload() {
        this.load.spritesheet('tiles', 'assets/klospritesheet.png', {
            frameWidth: 16,
            frameHeight: 16,
            spacing: 1
        })
        //this.load.spritesheet('cursors', 'assets/cursors.png',{frameWidth: 16, frameHeight:16})

    }

    create() {
        dungeon.initialize(this)
        dungeon.player = new PlayerCharacter(15, 15)
        dungeon.player2 = new PlayerCharacter(16, 16)
        dungeon.cursorSprite = new CursorSprite()
        turnManager.addEntity(dungeon.player)
        turnManager.addEntity(dungeon.player2)
        turnManager.addEntity(new BasicMonster(20, 20))
        var timer = dungeon.scene.time.addEvent({
            delay: 75,
            callback: this.myUpdate,
            loop: true, 
        })
    }

    myUpdate(t, dt) {
            if (turnManager.over()) {
                turnManager.refresh()
            }
            turnManager.turn()
    }
}