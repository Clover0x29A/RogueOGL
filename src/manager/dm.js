/**
 * So what we have here is a start to the dungeon manager.
 *  We have pulled all the code that we had started with in
 * the create portion of the game scene, and put it into here. 
 *  We also created a init function with all that code.
 *  A sprites object to use with the tilemapSet, and imported the
 * level into here also.
 */

import Phaser from '../lib/phaser.js'
import room1 from '../maps/level.js'
import turnManager from './tm.js'

    let dungeon = {
    sprites: {
        floor: 0,
        wall: 1,
        cursorYellow: 4,
        cursorRed: 5,
    },

    tileSize: 16,

    initialize: function (scene) {
        this.scene = scene
        this.level = room1
        let levelWithTiles = room1.map(r => r.map(t => t === 1 ? this.sprites.wall : this.sprites.floor))

        const config = {
            data: levelWithTiles,
            tileWidth: this.tileSize,
            tileHeight: this.tileSize,
        }

        const map = scene.make.tilemap(config)
        const tileset = map.addTilesetImage('colored', 'tiles', this.tileSize, this.tileSize, 0, 1)
        this.map = map.createLayer(0, tileset, 0, 0)  
        /**
         * make cursor for use when attacking
         * could possibly use it for deciding 
         * where to move.  That was the original
         * idea anyways.....Make it so!
         */
 
         
        
    },

    isWalkableTile: function (x,y) {
        let allEntities = [...turnManager.entities]
        for (let e = 0; e < allEntities.length; e++){
            let entity = allEntities[e]
            if (entity.x === x && entity.y === y)
            { return false}
        }
        let tileAtDestination = dungeon.map.getTileAt(x,y)
        return true !== dungeon.sprites.wall
    },
    entityAtTile: function (x, y) {
        let allEntities = [...turnManager.entities]
        for (let e = 0; e < allEntities.length; e++ ) {
            let entity = allEntities[e]
            if (entity.x === x && entity.y === y) {
                return entity
            }
        }
        return false
    },

    removeEntity: function(entity) {
        turnManager.entities.delete(entity)
        entity.sprite.destroy()
        entity.onDestroy()
    },

    initializeEntity: function(entity) {
        let x = this.map.tileToWorldX(entity.x)
        let y = this.map.tileToWorldY(entity.y)
        entity.sprite = this.scene.add.sprite(x, y, 'tiles', entity.tile)
        entity.sprite.setOrigin(0)
    },

    moveEntityTo: function (entity, x, y) {
        entity.moving = true

        this.scene.tweens.add({
            targets: entity.sprite,
            onComplete: () => {
                if(entity.type === 'foe') {entity.moving = false}
                entity.x = x
                entity.y = y
            },
            x: this.map.tileToWorldX(x),
            y: this.map.tileToWorldY(y),
            ease: "Power2",
            duration: 200
        })
    },

    distanceBetweenEntities(e1, e2){
        let grid = new PF.Grid(this.level)
        let finder = new PF.AStarFinder({allowDiagonal: true})

        let path = finder.findPath(e1.x, e1.y, e2.x, e2.y, grid)

        if(path.length >= 2) { return path.length }
        else { return false}
    },

    attackEntity(attacker, defender){
        attacker.moving = true
        attacker.tweens = attacker.tweens || 0
        attacker.tweens += 1

        this.scene.tweens.add({
            targets: attacker.sprite, 
            onComplete: () => {
            attacker.sprite.x = this.map.tileToWorldX(attacker.x)
            attacker.sprite.y = this.map.tileToWorldY(attacker.y)
            attacker.moving = false
            attacker.tweens -= 1

            let damage = attacker.attack()
            defender.hp -= damage
            
            console.log(`${attacker.name} does ${damage} to ${defender.name}.`)
            console.log(`${defender.name} has ${defender.hp} left.`)

            if(defender.hp <= 0) { this.removeEntity(defender)}

        },
        x: this.map.tileToWorldX(defender.x),
        y: this.map.tileToWorldY(defender.y),
        ease: 'Power2',
        hold: 20,
        duration: 80,
        delay: attacker.tweens * 200,
        yoyo: true,
    })

    },

}

export default dungeon