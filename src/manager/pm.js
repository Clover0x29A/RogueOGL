import dungeon from './dm.js'
import {
    initiative
} from './randoms.js'
import MoveManager from './mm.js'
import UI from '../scenes/ui.js'

export default class PlayerCharacter {

    constructor(x, y, name) {
        this.name = name
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
        this.class = 'Fighter'
        this.race = 'Dwarf'
        this.moving = false
        this.acting = false
        this.weapon = 'sword'
        this.weaponRange = 1
        this.weaponDmg = 6
        this.moveManager = new MoveManager
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
            this.createUI()
            this.sprite.setFrame(this.tileHighlight)
            this.turnStarted = true
            dungeon.cursorSprite.x = this.x
            dungeon.cursorSprite.y = this.y
            dungeon.moveEntityTo(dungeon.cursorSprite, this.x, this.y)
        }
        if(this.attackBtn.isDown){
            if(this.actions === 0) { return }
            
            if(this.acting) {
                this.confirm()
                return
            }
            this.acting = true
            this.moveManager.setupMoveInfo(this, false)
            dungeon.cursorSprite.sprite.visible = true
        }

        if (this.moveBtn.isDown) {
            if(this.movePoints === 0){ return }
            //dungeon.scene.input.keyboard.resetKeys()
            if (this.moving) {
                this.confirm()
                return
            }
            this.moving = true
            this.moveManager.setupMoveInfo(this, true)
            dungeon.cursorSprite.sprite.visible = true
        }
        if (this.cancelBtn.isDown) {
            //dungeon.scene.input.keyboard.resetKeys()
            if (this.moving || this.acting) {
                this.cancel()
            }
        }
        if (this.confirmBtn.isDown) {
            //dungeon.scene.input.keyboard.resetKeys()
            if (this.moving || this.acting) {
                this.confirm()
            }
        }
        if (this.endTurnBtn.isDown) {
            if (!this.moving) {
                this.movePoints = 0
                this.actions = 0
                this.sprite.setFrame(this.tile)
            }
        }
        if (this.moving || this.acting) {
            let currentX = dungeon.cursorSprite.x
            let currentY = dungeon.cursorSprite.y

            if (this.cursors.left.isDown) {
                if (currentX - 1 >= this.moveManager.validXFloor ) {
                    currentX -= 1
                    if(this.moving){
                    dungeon.cursorSprite.sprite.setFrame(!dungeon.isWalkableTile(currentX, currentY)?dungeon.sprites.cursorRed: dungeon.sprites.cursorYellow)
                    } else{
                        dungeon.cursorSprite.sprite.setFrame(!dungeon.isWalkableTile(currentX, currentY)?dungeon.sprites.cursorYellow: dungeon.sprites.cursorRed)
                    }
                    dungeon.moveEntityTo(dungeon.cursorSprite, currentX, currentY)
                }
            } 
            if (this.cursors.right.isDown) {
                if (currentX + 1 <= this.moveManager.validXCeil) {
                    currentX += 1
                    if(this.moving){
                        dungeon.cursorSprite.sprite.setFrame(!dungeon.isWalkableTile(currentX, currentY)?dungeon.sprites.cursorRed: dungeon.sprites.cursorYellow)
                        } else{
                            dungeon.cursorSprite.sprite.setFrame(!dungeon.isWalkableTile(currentX, currentY)?dungeon.sprites.cursorYellow: dungeon.sprites.cursorRed)
                        }
                    dungeon.moveEntityTo(dungeon.cursorSprite, currentX, currentY)
                }
            }

            if (this.cursors.up.isDown) {
                if (currentY - 1 >= this.moveManager.validYFloor ) {
                    currentY -= 1
                    if(this.moving){
                        dungeon.cursorSprite.sprite.setFrame(!dungeon.isWalkableTile(currentX, currentY)?dungeon.sprites.cursorRed: dungeon.sprites.cursorYellow)
                        } else{
                            dungeon.cursorSprite.sprite.setFrame(!dungeon.isWalkableTile(currentX, currentY)?dungeon.sprites.cursorYellow: dungeon.sprites.cursorRed)
                        }
                    dungeon.moveEntityTo(dungeon.cursorSprite, currentX, currentY)
                }
            }
            if (this.cursors.down.isDown) {
                if (currentY + 1 <= this.moveManager.validYCeil) {
                    currentY += 1
                    if(this.moving){
                        dungeon.cursorSprite.sprite.setFrame(!dungeon.isWalkableTile(currentX, currentY)?dungeon.sprites.cursorRed: dungeon.sprites.cursorYellow)
                        } else{
                            dungeon.cursorSprite.sprite.setFrame(!dungeon.isWalkableTile(currentX, currentY)?dungeon.sprites.cursorYellow: dungeon.sprites.cursorRed)
                        }
                    dungeon.moveEntityTo(dungeon.cursorSprite, currentX, currentY)
                }
            }
        }
        dungeon.scene.input.keyboard.resetKeys()
    }
    confirm() {
        if(this.moving){
        if(dungeon.cursorSprite.sprite.frame === dungeon.sprites.cursorRed) { return }
        let lengthMoved = this.moveManager.distanceMoved(dungeon.cursorSprite.x, dungeon.cursorSprite.y)
        this.movePoints -= lengthMoved
        dungeon.moveEntityTo(this, dungeon.cursorSprite.x, dungeon.cursorSprite.y)
        this.moving = false
        }
        if(this.acting){
            if(dungeon.cursorSprite.sprite.frame === dungeon.sprites.cursorRed) { return }
                let entity = dungeon.entityAtTile(dungeon.cursorSprite.x, dungeon.cursorSprite.y)
                if(entity.type === 'foe'){
                    dungeon.attackEntity(this,entity)
                    this.actions -= 1
                    this.acting = false
                }
        }
        dungeon.scene.registry.set('pcActMove', [this.movePoints * 5, this.actions])
        dungeon.cursorSprite.sprite.visible = false
    }
    cancel() {
        if(this.moving){ this.moving = false } 
        if(this.acting) { this.acting = false }
        dungeon.cursorSprite.sprite.visible = false
    }
    
    /**
        if (this.hp <= 3) {
            this.sprite.tint = Phaser.Display.Color.GetColor(255, 0, 0)
        }
        */


    over() {
        if(this.movePoints === 0 && this.actions === 0 && !this.moving) {
            this.sprite.setFrame(this.tile)
        }
        return this.movePoints === 0 && this.actions === 0 && !this.moving
    }

    attack() {
        return 5
    }

    onDestroy() {
        console.log(this.name + ' was killed')
        dungeon.moveEntityTo(this, -100, -100)
    }

    createUI() {
        dungeon.scene.registry.set('pcData', [this.name, this.race, this.class])
        dungeon.scene.registry.set('pcActMove', [this.movePoints * 5, this.actions])

        /*
        dungeon.scene.registry.set('pcClass', this.class)
        dungeon.scene.registry.set('pcMoves', this.movePoints)
        dungeon.scene.registry.set('pcActions', this.actions)
        let accumulatedHeight = 0
    */
        /*
        // Character sprite and name 
        this.UIHeader = scene.add.text(
            x + 20, 
            y, 
            this.name, 
            { 
                font: '16px Arial', 
                color: '#cfc6b8' 
            })
    
    
        // Character stats
        this.UIStatsText = scene.add.text(
            x + 20, 
            y + 20, 
            `HP: ${this.hp}\nMP: ${this.movePoints}\nAP: ${this.actions}`, 
            { 
                font: '12px Arial', 
                fill: '#cfc6b8' 
            })
    
        accumulatedHeight += this.UIStatsText.height + this.UIsprite.height
    
        // Inventory screen
        let itemsPerRow = 5
        let rows = 2
        this.UIitems = []
    
        for (let row = 1; row <= rows; row++) {
            for (let cell = 1; cell <= itemsPerRow; cell++) {
                let rx = x + (25 * cell)
                let ry = y + 50 + (25 * row)
                this.UIitems.push(
                    scene.add.rectangle(rx, ry, 20, 20, 0xcfc6b8, 0.3).setOrigin(0)
                )
            }
        }
    
        accumulatedHeight += 90
    
        // Separator
        scene.add.line(x+5, y+120, 0, 10, 175, 10, 0xcfc6b8).setOrigin(0)
    
        return accumulatedHeight
        */
    }
}

