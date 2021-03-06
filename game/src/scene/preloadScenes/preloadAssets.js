import Phaser from "phaser";
import {store} from "../../store";
import {globalTranslations, local} from "../../localization/local";

export default class preloadAssets extends Phaser.Scene {
    constructor() {
        super("preloadAssets");
    }

    preload() {
        console.log("preloadAssets -> preload");

        this.drawPreload({x: store.baseConfig.centreScreen.x, y: store.baseConfig.centreScreen.y});

        this.load.atlas('tiles', 'assets/sprites/gameBoard/tiles/spritesheet_tiles.png', 'assets/sprites/gameBoard/tiles/spritesheet_tiles.json');

        this.load.image("backgroundBoard", "assets/sprites/gameBoard/backgroundBoard.png");

        // UI
        {
            this.load.image("button-1", "assets/sprites/UI/button-1.png");
            this.load.image("button-2", "assets/sprites/UI/button-2.png");
            this.load.image("button-booster", "assets/sprites/UI/button-booster.png");
            this.load.image("button-pause", "assets/sprites/UI/button-pause.png");
            this.load.image("money-icon", "assets/sprites/UI/money-icon.png");
            this.load.image("panel-quest", "assets/sprites/UI/panel-quest.png");

            // modal Window
            {
                this.load.image("header", "assets/sprites/UI/window/header.png");
                this.load.atlas('window', 'assets/sprites/UI/window/spritesheet-window.png', 'assets/sprites/UI/window/spritesheet-window.json');

            }
        }

    }

    create() {
        console.log("preloadAssets -> create");

        this.time.delayedCall(400, this.addStartButton, [{
            x: store.baseConfig.centreScreen.x,
            y: store.baseConfig.centreScreen.y + 250
        }], this);
    }


    /**
     * Добавить кнопку смены уровня.
     * @param position
     */
    addStartButton(position) {
        let imgButton = this.add.image(position.x, position.y, "button-2").setInteractive({cursor: 'pointer'});
        imgButton.setScale(0.6, 0.5);


        const textButton = store.gameFunc.addText(this, globalTranslations[local].play, {
            x: position.x,
            y: position.y - 2
        });
        textButton.setFontSize(32);


        const buttonClick = this.plugins.get('rexButton').add(imgButton);
        buttonClick.on('click', function (button, gameObject, pointer, event) {
            console.log('button.click');

            const playGameScene = this.scene.get("playGameScene");
            playGameScene.scene.start("playGameScene", {numLevel: 0});

            this.scene.start("UIPlayScene", {playGameScene: playGameScene});
            this.scene.stop();
        }, this);
    }

    /**
     * Визуализация предзагрузки.
     */
    drawPreload(position) {
        const scale = .4;

        const progressText = store.gameFunc.addText(this, globalTranslations[local].loading, {
            x: position.x,
            y: position.y - 25
        });
        progressText.setFontSize(28);

        this.add.sprite(position.x, position.y, "footing").setScale(scale);

        this.add.sprite(position.x, position.y + 30, "progressBar", "progress_fon").setScale(scale);
        let progressLine = this.add.sprite(position.x, position.y + 30, "progressBar", "progress").setScale(scale);


        const shapeExp = this.make.graphics();
        shapeExp.fillRect(progressLine.getLeftCenter().x - progressLine.displayWidth, progressLine.getTopCenter().y,
            progressLine.displayWidth, progressLine.displayHeight);

        progressLine.setMask(shapeExp.createGeometryMask());

        this.load.on('progress', (value) => {
            this.tweens.add({
                targets: shapeExp,
                x: value * progressLine.displayWidth,
                duration: 400,
                ease: 'Sine.easeInOut'
            });
        });
    }
}

