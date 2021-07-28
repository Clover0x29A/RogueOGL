import Phaser from './lib/phaser.js'
import Game from './scenes/Game.js'
import Hud from './scenes/hud.js'


export default new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    pixelArt: true,
    zoom: 1,
    scene: Game,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0
            },
        }
    },
    fps: {forceSetTimeOut: true},
})