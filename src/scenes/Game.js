import Phaser from '../lib/phaser.js'
import dungeon from '../manager/dm.js'
import turnManager from '../manager/tm.js'
import PlayerCharacter from '../manager/pm.js'
import BasicMonster from '../manager/monster.js'

export default class Game extends Phaser.Scene {

    constructor() {
        super('')
    }

    preload() {
        this.load.spritesheet('tiles', 'assets/colored.png', { frameWidth: 16, frameHeight: 16, spacing: 1  })
        
    }

    create() {
       dungeon.initialize(this)
       dungeon.player = new PlayerCharacter(15, 15)
       dungeon.player2 = new PlayerCharacter(16,16)
       turnManager.addEntity(dungeon.player)
       turnManager.addEntity(dungeon.player2)
       turnManager.addEntity(new BasicMonster(20,20))
    }

    update(t, dt) {
        if(turnManager.over()) {
            turnManager.refresh()
        }
        turnManager.turn()
    }
}
