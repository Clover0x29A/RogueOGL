import phaser from '../lib/phaser.js'
import dungeon from './dm.js'

      /**
         * cursor for use when attacking
         * and where to move.  That was the original
         * idea anyways.....Make it so!  I call in
         * game.js to create dungeon.cursorSprite
         */
 
export default class CursorSprite {
        constructor(){
        this.x = dungeon.player.x
        this.y = dungeon.player.y
        this.tile = dungeon.sprites.cursorYellow,
        this.moving = true
        this.sprite = dungeon.scene.add.sprite(this.x, this.y, 'tiles', this.tile)
        this.sprite.visible = false
         this.sprite.setOrigin(0)
    }
}