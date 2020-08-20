import {store} from "../../store";
import {globalTranslations, local} from "../../localization/local";


export default class loseScene extends Phaser.Scene {

    constructor() {
        super("loseScene");

        this.speedShowScene = 600;
    }

    create() {
        this.addOvershadow();

        this.groupWindowContent = this.add.group();
        this.containerWindow = this.add.container(0, 0).setDepth(10);


        store.gameFunc.drawModal(this, this.containerWindow, {
            x: store.baseConfig.centreScreen.x,
            y: store.baseConfig.centreScreen.y / 2
        }, 8);

        this.addHeaderText({
            x: store.baseConfig.centreScreen.x,
            y: store.baseConfig.centreScreen.y / 2 - 45
        });

        this.addButtonNextLvl({
            x: store.baseConfig.centreScreen.x,
            y: store.baseConfig.centreScreen.y / 2 + 300
        });

        this.animateShowScene();
    }

    /**
     * Добавить затевнение фона
     */
    addOvershadow() {
        this.overShadow = this.add.rectangle(store.baseConfig.centreScreen.x, store.baseConfig.centreScreen.y, store.baseConfig.gameWidth, store.baseConfig.gameHeight, 0x000000);
        this.overShadow.setAlpha(0);

        this.tweens.add({
            targets: this.overShadow,
            alpha: 0.6,
            delay: this.speedShowScene,
            duration: 600,
            ease: 'Power2'
        });
    }


    /**
     * Отрисовать заголовок окна
     */
    addHeaderText(position) {
        const headerText = store.gameFunc.addText(this, globalTranslations[local].lose, {
            x: position.x,
            y: position.y
        });
        headerText.setFontSize(26);

        this.groupWindowContent.add(headerText);
    }


    /**
     * Добавить кнопку смены уровня.
     * @param position
     */
    addButtonNextLvl(position) {
        let imgButton = this.add.image(position.x, position.y, "button-2").setInteractive({cursor: 'pointer'});
        imgButton.setScale(0.5, 0.4);
        imgButton.setDepth(21);

        this.groupWindowContent.add(imgButton);


        const textButton = store.gameFunc.addText(this, globalTranslations[local].restart, {
            x: position.x,
            y: position.y - 2
        });
        textButton.setFontSize(26);
        textButton.setDepth(22);

        this.groupWindowContent.add(textButton);


        const buttonClick = this.plugins.get('rexButton').add(imgButton);
        buttonClick.on('click', function (button, gameObject, pointer, event) {
            console.log('button.click');

            const playGameScene = this.scene.get("playGameScene");

            this.scene.launch("playGameScene", {numLevel: playGameScene.currentLevel});
            this.scene.launch("UIPlayScene", {playGameScene: playGameScene});

            this.scene.stop();
        }, this);
    }

    /**
     * Анимировать появление сцены.
     */
    animateShowScene() {
        this.cameras.main.setPosition(store.baseConfig.gameWidth, 0);

        this.tweens.add({
            targets: this.cameras.main,
            x: "-=" + store.baseConfig.gameWidth,
            duration: this.speedShowScene,
            ease: 'Back.easeOut'
        });
    }
}
