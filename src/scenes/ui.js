import Phaser from '../lib/phaser.js'
import dungeon from '../manager/dm.js'
import turnManager from '../manager/tm.js'

export default class UI extends Phaser.Scene {
    constructor() {
        super({
            key: 'ui',
            active: true
        })
        this.createdUI = false
        this.log = ''
        this.x = 650
        this.y = 0
        this.newY = 15

    }

    preload() {
        this.load.image('hud', 'assets/hud.png')

    }
    create() {
        this.add.image(650, 0, 'hud').setOrigin(0)
        this.UIName = this.add.text(
            this.x + 15,
            this.newY,
            '', {
                font: '16px Arial',
                color: '#cfc6b8'
            })
            this.newY += 20
        this.UIRaceClass = this.add.text(
            this.x + 15,
            this.newY,
            '', {
                font: '14px Arial',
                color: '#cfc6b8'
            })
            this.newY += 20

            this.UIActMove = this.add.text(
                this.x + 15,
                this.newY,
                '', {
                    font: '14px Arial',
                    color: '#cfc6b8'
                })
               this.newY += 20

        this.log = this.add.text(this.x + 15, this.newY, '', {
            font: '12px Arial',
            color: '#cfc6b8',
            wordWrap: {
                width: 140
            }
        })
        this.createdUI = true
        this.registry.events.on('changedata', this.updateData, this)

    }
    update() {
        if (this.createdUI) {

            let text = dungeon.msgs.join(`\n`)
            this.log.setText(text)
        }
    }

    updateData(parent, key, data) {
        if (key === 'pcData') {
            this.UIName.setText(data[0])
            this.UIRaceClass.setText(data[1] + ' - '  + data[2])
        }
        if( key === 'pcActMove'){
            this.UIActMove.setText('spd: ' + data[0] + '\tActions: ' + data[1] )
        }
    }
}