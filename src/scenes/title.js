import World from './world.js';
import UI from './ui.js'

export default class Title extends Phaser.Scene {

   
    constructor() {
        super({key: 'title', active: true})
        this.menu = []
        this.activeOne = 0

    }

    preload() {
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js')
    }
/**
 * yeah.  I decided after starting with the basic dungeon scene that
 * i would actually start to make a basic title screen.  Might be helpful
 * might not.  I can now at least add a name and a start button.  It's a .....
 * start! Sorry, couldn't help that one.
 */
    create() {
        WebFont.load({
            custom: {families: ['8bit', 'glitch']}
        })
        this.scene.pause('world')
        this.scene.pause('ui')
        this.add.text(225,200, 'Rogue-OGL').setFontFamily('bit8').setFontSize(48).tint = Phaser.Display.Color.GetColor(255, 0, 0)
        this.cursors = this.input.keyboard.createCursorKeys()
        this.topText = this.add.text(335, 258, 'Whatever')
        this.topText.setFontFamily('bit8').setFontSize(14).tint = Phaser.Display.Color.GetColor(100, 100, 100)
        this.activeText = this.add.text(335, 286, 'Start')
        this.activeText.setFontFamily('bit8').setFontSize(20).tint = Phaser.Display.Color.GetColor(255, 255, 255)
        this.bottomText = this.add.text(335, 320, 'Options')
        this.bottomText.setFontFamily('bit8').setFontSize(14).tint = Phaser.Display.Color.GetColor(100, 100, 100)
        this.menu = ['Start', 'Options', 'Sound', 'Whatever']
        
    
    }

    update(t,td){
        if(this.cursors.down.isDown){
            this.input.keyboard.resetKeys()
            this.topText.text = this.menu[this.activeOne]
            this.activeOne++
            if(this.activeOne >= this.menu.length) {this.activeOne = 0}
            this.activeText.text = this.menu[this.activeOne]
            this.bottomText.text = this.menu[this.activeOne + 1]
            if(this.activeOne + 1 === this.menu.length)
            this.bottomText.text = this.menu[0]
        }
    }

}
