export default class Title extends Phaser.Scene {

   
    constructor() {
        super({key: 'title', active: true})
        this.menu = []
        this.activeOne = 0
    }

    preload() {
        this.load.bitmapFont('arcade', 'font/arcade.png', 'font/arcade.xml');
    }
/**
 * yeah.  I decided after starting with the basic dungeon scene that
 * i would actually start to make a basic title screen.  Might be helpful
 * might not.  I can now at least add a name and a start button.  It's a .....
 * start! Sorry, couldn't help that one.
 */
    create() {

        this.add.bitmapText(225,200, 'arcade', ' Rogue-OGL', 32).tint = Phaser.Display.Color.GetColor(255, 0, 0)

        let startText = this.add.bitmapText(325, 260,'arcade', 'Start', 18).tint = Phaser.Display.Color.GetColor(255, 255, 255)
        let optionsText = this.add.bitmapText(325, 290,'arcade', 'Options', 18).tint = Phaser.Display.Color.GetColor(100, 100, 100)
        this.menu = [startText, optionsText]


        this.input.keyboard.on('keydown-DOWN', this.myDown(), this)
        this.input.keyboard.on('keydown-UP', this.myUp(), this)

    
    }
    myUp(){
        this.activeOne--
    if(this.activeOne <= -1) { this.activeOne = this.menu.length -1}
    this.menu[this.activeOne].setTintFill = Phaser.Display.Color.GetColor(255, 255, 255)
    this.menu[this.activeOne + 1].setTintFill = Phaser.Display.Color.GetColor(100, 100, 100)
    }

    myDown() {
        this.activeOne++
        if(this.activeOne >= this.menu.length) { this.activeOne = 0}
        this.menu[this.activeOne].setTintFill = Phaser.Display.Color.GetColor(255, 255, 255)
        this.menu[this.activeOne - 1].bitmapText.setTintFill = Phaser.Display.Color.GetColor(100, 100, 100)
    }
}

