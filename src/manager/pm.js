import dungeon from "./dm.js"
import {
    initiative
} from "./randoms.js"
import MoveManager from "./mm.js"

export default class PlayerCharacter {

    constructor(x, y) {
        this.name = 'player'
        this.movePoints = 5
        this.actions = 1
        this.cursors = dungeon.scene.input.keyboard.createCursorKeys()
        this.attackBtn = dungeon.scene.input.keyboard.addKey('A')
        this.moveBtn = dungeon.scene.input.keyboard.addKey('M')
        this.confirmBtn = dungeon.scene.input.keyboard.addKey('ENTER')
        this.cancelBtn = dungeon.scene.input.keyboard.addKey('ESC')
        this.endTurnBtn = dungeon.scene.input.keyboard.addKey('D')
        this.turnStarted = false
        this.x = x
        this.y = y
        this.tile = 2
        this.tileHighlight = 7
        this.hp = 10
        this.type = 'friend'
        this.moving = false
        this.acting = false
        this.moveManager = new MoveManager
        this.doOnce = true
        this.initiative = initiative()
        dungeon.initializeEntity(this)
    }

    refresh() {
        this.movePoints = 5
        this.actions = 1
        this.turnStarted = false
    }
    /**
     * this like all entities with a turn get called from the
     * turnManager.  the PCs have the cursor keys bound to them
     * I plan on adding the ability to attack by pressing 'A', and then
     * allowing them to choose a target within range.  also at some point
     * add  both spells and ranged weapons.  My large todo at the moment is
     * add stats and rollable to hit and rollable damage based off of weapon.
     * Another TODO add character creation screen, and menu....and lots of other 
     * stuff
     */

    turn() {
        if (!this.turnStarted) {
            this.moveManager.setupMoveInfo(this)
            this.sprite.setFrame(this.tileHighlight)
            this.turnStarted = true
        }

        if(this.attackBtn.isDown){

        }
        
        if (this.moveBtn.isDown) {
            if (this.moving) {
                this.confirmMove()
                return
            }
            this.moveManager.setupMoveInfo(this)
            dungeon.cursorSprite.x = this.x
            dungeon.cursorSprite.y = this.y
            dungeon.moveEntityTo(dungeon.cursorSprite, dungeon.cursorSprite.x + 1, dungeon.cursorSprite.y)
            dungeon.cursorSprite.sprite.hidden = false
            this.moving = true
        }
        if (this.cancelBtn.isDown) {
            if (this.moving) {
                this.cancelMove()
            }
        }
        if (this.confirmBtn.isDown) {
            if (this.moving) {
                this.confirmMove()
            }
        }
        if (this.endTurnBtn.isDown) {
            if (!this.moving) {
                this.movePoints = 0
                this.actions = 0
                this.sprite.setFrame(this.tile)
            }
        }
        if (this.moving) {
            let currentX = dungeon.cursorSprite.x
            let currentY = dungeon.cursorSprite.y

            if (this.cursors.left.isDown) {
                if (currentX - 1 >= this.moveManager.validXFloor ) {
                    currentX -= 1
                    dungeon.cursorSprite.sprite.setFrame(!dungeon.isWalkableTile(currentX, currentY)?dungeon.sprites.cursorRed: dungeon.sprites.cursorYellow)
                    dungeon.moveEntityTo(dungeon.cursorSprite, currentX, currentY)
                }
            }
            if (this.cursors.right.isDown) {
                if (currentX + 1 <= this.moveManager.validXCeil) {
                    currentX += 1
                    dungeon.cursorSprite.sprite.setFrame(!dungeon.isWalkableTile(currentX, currentY)?dungeon.sprites.cursorRed: dungeon.sprites.cursorYellow)
                    dungeon.moveEntityTo(dungeon.cursorSprite, currentX, currentY)
                }
            }

            if (this.cursors.up.isDown) {
                if (currentY - 1 >= this.moveManager.validYFloor ) {
                    currentY -= 1
                    dungeon.cursorSprite.sprite.setFrame(!dungeon.isWalkableTile(currentX, currentY)?dungeon.sprites.cursorRed: dungeon.sprites.cursorYellow)
                    dungeon.moveEntityTo(dungeon.cursorSprite, currentX, currentY)
                }
            }
            if (this.cursors.down.isDown) {
                if (currentY + 1 <= this.moveManager.validYCeil) {
                    currentY += 1
                    dungeon.cursorSprite.sprite.setFrame(!dungeon.isWalkableTile(currentX, currentY)?dungeon.sprites.cursorRed: dungeon.sprites.cursorYellow)
                    dungeon.moveEntityTo(dungeon.cursorSprite, currentX, currentY)
                }
            }
        }

    }
    confirmMove() {
        if(this.moving){
        if(dungeon.cursorSprite.sprite.frame === dungeon.sprites.cursorRed) { return }
        let moveX = dungeon.cursorSprite.x
        let moveY = dungeon.cursorSprite.y
        dungeon.moveEntityTo(this, moveX, moveY)
        dungeon.cursorSprite.sprite.hidden = true
        dungeon.moveEntityTo(dungeon.cursorSprite, -100, -100)
        let lengthMoved = this.moveManager.distanceMoved(moveX, moveY)
        this.movePoints -= lengthMoved
        this.moving = false
        }
        if(this.acting){}
    }
    cancel() {
        if(this.moving){
            dungeon.cursorSprite.sprite.hidden = true
            dungeon.moveEntityTo(dungeon.cursorSprite, -100, -100)
            this.moving = false
        }
    }
    
    /**
        if (this.hp <= 3) {
            this.sprite.tint = Phaser.Display.Color.GetColor(255, 0, 0)
        }
        */


    over() {
        //this.sprite.setFrame(this.tile)
        return this.movePoints === 0 && this.actions === 0 && !this.moving
    }

    attack() {
        return 5
    }

    onDestroy() {
        console.log(this.name + ' was killed')
        dungeon.moveEntityTo(this, -100, -100)
    }
}