import dungeon from "./dm.js"
import { initiative } from "./randoms.js"

export default class PlayerCharacter {

    constructor(x, y) {
        this.name = 'player'
        this.movePoints = 1
        this.actions = 1
        this.cursors = dungeon.scene.input.keyboard.createCursorKeys()
        this.attackBtn = dungeon.scene.input.keyboard.addKey('A')
        this.x = x
        this.y = y
        this.tile = 29
        this.hp = 10
        this.type = 'friend'
        this.moving = false
        this.initiative = initiative()

        dungeon.initializeEntity(this)
    }

    refresh() {
        this.movePoints = 1
    }

    turn() {
        let oldX = this.x
        let oldY = this.y
        let moved = false
        let newX = this.x
        let newY = this.y
        //this.sprite.tint = Phaser.Display.Color.GetColor(0, 0, 255)

        if (this.movePoints > 0 && !this.moving) {
            if (this.cursors.left.isDown) {
                newX -= 1
                moved = true
            }
            if (this.cursors.right.isDown) {
                newX += 1
                moved = true
            }
            if (this.cursors.up.isDown) {
                newY -= 1
                moved = true
            }
            if (this.cursors.down.isDown) {
                newY += 1
                moved = true
            }
            if (moved) {
                this.movePoints -= 1

                if (!dungeon.isWalkableTile(newX, newY)) {
                   let enemy = dungeon.entityAtTile(newX,newY)

                   if (enemy.type === 'foe' && this.actions > 0) {
                       dungeon.attackEntity(this, enemy)
                       this.action -= 1
                   }

                   newX = oldX
                   newY = oldY
                }
                if( newX !== oldX || newY !== oldY) { dungeon.moveEntityTo(this, newX, newY)}
                
            }
            
        }

        if (this.hp <= 3) {
            this.sprite.tint = Phaser.Display.Color.GetColor(255, 0, 0)
        }
    }

    over() {
        //this.sprite.tint = Phaser.Display.Color.GetColor(255, 255, 255)
        return this.movePoints == 0 && !this.moving
    }

    attack() {
        return 5
    }

    onDestroy() {
        console.log(this.name + ' was killed')
        dungeon.moveEntityTo(this, -100, -100)
    }
}