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


        this.addProgressBar({x: store.baseConfig.centreScreen.x, y: 35});

        this.addStepLabel({x: 74, y: 38}, 10);
        this.addScoreLabel({x: store.baseConfig.gameWidth - 74, y: 38}, 10);


        this.events.on("changeScore", () => {
            console.log("UI changeScore");
        })
    }

    addProgressBar(position) {
        const context = this;
        const scale = .25;

        const progressText = store.addText(this, globalTranslations[local].progress, {
            x: position.x,
            y: position.y - 18
        });
        progressText.setFontSize(28);

        this.add.sprite(position.x, position.y, "footing").setScale(scale);

        this.add.sprite(position.x, position.y + 22, "progressBar", "progress_fon").setScale(scale);
        let loadingProgress = this.add.sprite(position.x, position.y + 22, "progressBar", "progress").setScale(scale);

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

    addStepLabel(position, margin) {
        const context = this;
        const scale = .3;

        const button = this.add.sprite(position.x, position.y, "button-1").setScale(scale);
        this.add.sprite(position.x - button.displayWidth / 2 + margin, position.y, "money-icon").setScale(scale);

        const stepCountText = store.addText(this, this.playGameScene.gameBoard.task.maxStep, {
            x: position.x + margin,
            y: position.y - 2
        });
        stepCountText.setFontSize(26);

        this.events.on("changeStepCount", (value) => {
            console.log("UI changeStepCount");

            stepCountText.setText(value);
        })
    }

    addScoreLabel(position, margin) {
        const context = this;
        const scale = .3;

        const button = this.add.sprite(position.x, position.y, "button-2").setScale(scale);
        this.add.sprite(position.x + button.displayWidth / 2 - margin, position.y, "money-icon").setScale(scale);

        const scoreText = store.addText(this, 0, {
            x: position.x - margin,
            y: position.y - 2
        });
        scoreText.setFontSize(26);

        this.events.on("changeScore", (value) => {
            console.log("UI changeScore");

            scoreText.setText(value);
        })
    }
}
