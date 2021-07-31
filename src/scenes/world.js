/**
 * So yes this is the base calss for the game itself.  I removed the Update()
 * so that I could use a timer instead and created my myUpdate().  I was finding that 
 * with the update it was creating a lot of issues with registering to many keypresses
 * in a row.  Since it's not really necessary for what I am trying to accomplish, no
 * big deal so far that it is missing.
 */


import Phaser from '../lib/phaser.js'
import dungeon from '../manager/dm.js'
import turnManager from '../manager/tm.js'
import PlayerCharacter from '../manager/pm.js'
import BasicMonster from '../manager/monster.js'
import CursorSprite from '../manager/cursor.js'

export default class World extends Phaser.Scene {

   
    constructor() {
        super({key: 'world', active: true})
    }

    preload() {
        this.load.spritesheet('tiles', 'assets/klospritesheet.png', {
            frameWidth: 16,
            frameHeight: 16,
            spacing: 1
        })
        //this.load.spritesheet('cursors', 'assets/cursors.png',{frameWidth: 16, frameHeight:16})
        this.scene.pause('world')
    }
/**
 * so yes there is two players and one monster
 * at some point I want to be able to allow anywhere from 1 - 4
 * characters....and a lot more monsters :)
 */
    create() {
        dungeon.initialize(this)
        dungeon.player = new PlayerCharacter(15, 15, 'bob')
        dungeon.player2 = new PlayerCharacter(16, 16, 'harry')
        dungeon.cursorSprite = new CursorSprite()
        turnManager.addEntity(dungeon.player)
        turnManager.addEntity(dungeon.player2)
        turnManager.addEntity(new BasicMonster(20, 20))
        turnManager.addEntity(new BasicMonster(20, 19))
        turnManager.addEntity(new BasicMonster(20, 22))

        /**
         * creating camera to focus on the level and the player
         * will update to follow each entity on their turn if a 
         * PC
         */
        
        let camera = this.cameras.main
        camera.setViewport(0, 0, camera.worldView.width - 150, camera.worldView.height) 
        camera.setBounds(0, 0, camera.worldView.width, camera.worldView.height)
        camera.startFollow(dungeon.player.sprite)

        /**
         * setting registry points to be able to send data to the
         * UI on the PC's turn.  Also to be able to update movePoints
         * and actions when used  and list of their stats(i.e. strength,stamina....
         * you get the idea) and I'm going to add in an inventory per party. that
         * should make it interesting. limited arrows...per party...potions..yup
         * sounds fun.  limit amount that can be carried based off of average party
         * level.
         */

        //pcData wiill be name class and race
        //pcActMove is movePoints and Actions
        //pcStats of course are the player stats
        dungeon.scene.registry.set('pcData', [])
        dungeon.scene.registry.set('pcActMove', [])
        dungeon.scene.registry.set('pcStats', [])


    }

    update(t, dt) {
            if (turnManager.over()) {
                turnManager.refresh()
            }
            turnManager.turn()
    }
}

/**
 * 
 */