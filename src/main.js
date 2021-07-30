import Phaser from './lib/phaser.js'
import World from './scenes/world.js'
import UI from './scenes/ui.js'
import Title from './scenes/title.js'


export default new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#000000',
    pixelArt: true,
    zoom: 1,
    scene: [World, UI],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0
            },
        }
    },
    //fps: {forceSetTimeOut: true},
})