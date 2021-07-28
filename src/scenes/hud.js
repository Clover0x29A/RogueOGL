import Phaser from '../lib/phaser.js'

export default class Hud extends Phaser.Scene {
    constructor() {
        super('')
    }

    preload() {
        this.load.image('hud', 'assets/hud.png')
        //this.load.spritesheet('cursors', 'assets/cursors.png',{frameWidth: 16, frameHeight:16})
        
    }
    create(){
        this.add.image(650,0,'hud')
        this.scene.bringToTop()
    }
    update() {}
}