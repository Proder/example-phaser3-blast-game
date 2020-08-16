import Phaser from "phaser";
import {globalTranslations, local} from "../localization/local";
import {store} from "../store/";


export default class UIPlayScene extends Phaser.Scene {
    constructor() {
        super({key: 'UIPlayScene'});
        console.log("UIPlayScene constructor");


    }

    init(data) {
        this.playGameScene = data.playGameScene;

    }

    preload() {

    }

    create() {

        console.log("UIPlayScene create");


        this.addProgressBar({x: store.baseConfig.centreScreen.x, y: 38});


        this.events.on("changeScore", () => {
            console.log("UI changeScore");
        })
    }

    addProgressBar(position) {
        const context = this;

        const progressText = store.addText(this, globalTranslations[local].progress, {
            x: position.x,
            y: position.y - 18
        });
        progressText.setFontSize(30);

        this.add.sprite(position.x, position.y, "footing").setScale(0.3);

        this.add.sprite(position.x, position.y + 22, "progressBar", "progress_fon").setScale(0.3);
        let loadingProgress = this.add.sprite(position.x, position.y + 22, "progressBar", "progress").setScale(0.3);

        let shapeExp = this.make.graphics().setDepth(1).fillStyle(0x0000ff).beginPath();
        shapeExp.fillRect(loadingProgress.getLeftCenter().x - loadingProgress.displayWidth, loadingProgress.getTopCenter().y, loadingProgress.displayWidth, loadingProgress.displayHeight);

        let mask = shapeExp.createGeometryMask();
        loadingProgress.setMask(mask);

        this.events.on('level_progress', function (value) {
            if (value > 1)
                value = 1;

            context.tweens.add({
                targets: shapeExp,
                x: value * loadingProgress.displayWidth,
                duration: 400,
                ease: 'Sine.easeInOut'
            });
        });
    }
}
