import Phaser from './lib/phaser.js'
import Game from './scenes/Game.js'

export default new Phaser.Game({
    type: Phaser.AUTO,
    width: 80* 16,
    height: 50 * 16,
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
    }
})