import Phaser from '../lib/phaser.js'
/**
 * WE are now going to implement a turn manager
 * of course it is going to be another object....
 * still thinking about making it a class, but not yet
 * It will manage turns for all things not just player
 * I now get why this is an object.  It is a singleton
 */

const turnManager = {

    entities: new Set(),
    addEntity: (entity) => turnManager.entities.add(entity),
    removeEntity: (entity) => {
        turnManager.entities.delete(entity)
        
    },
    refresh: () => {
        turnManager.entities.forEach(e => e.refresh())
        turnManager.currentIndex = 0
    },
    currentIndex: 0,
    turn: () => {
        if (turnManager.entities.size > 0) {
            let entities = [...turnManager.entities]
            let e = entities[turnManager.currentIndex]
            entities.sort((a, b) => a.initiative - b.initiative)
            if (!e.over()) {
                e.turn()
            } else {
                turnManager.currentIndex++
            }
        }
    },
    over: () => [...turnManager.entities].every(e => e.over()),

}

export default turnManager