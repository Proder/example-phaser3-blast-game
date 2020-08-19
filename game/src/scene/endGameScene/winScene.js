import {store} from "../../store/";
import {globalTranslations, local} from "../../localization/local";

export default class winScene extends Phaser.Scene {

    constructor() {
        super("winScene");

        this.speedShowScene = 600;
        this.layers = 8;
    }

    preload() {
        console.log("winScene: preload")

    }

    create() {
        this.addOvershadow();

        this.groupWindowContent = this.add.group();
        this.containerWindow = this.add.container(0, 0).setDepth(10);


        store.gameFunc.drawModal(this, this.containerWindow, {
            x: store.baseConfig.centreScreen.x,
            y: store.baseConfig.centreScreen.y / 2
        }, this.layers);


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
     * Добавить затемнение фона
     */
    addOvershadow() {
        this.overShadow = this.add.rectangle(store.baseConfig.centreScreen.x, store.baseConfig.centreScreen.y, store.baseConfig.gameWidth, store.baseConfig.gameHeight, 0x000000);
        this.overShadow.setAlpha(0);

        this.tweens.add({
            targets: this.overShadow,
            alpha: 0.6,
            duration: 300,
            ease: 'Power2'
        });
    }


    /**
     * Отрисовать заголовок окна
     */
    addHeaderText(position) {
        const headerText = store.addText(this, globalTranslations[local].win, {
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


        const textButton = store.addText(this, globalTranslations[local].next, {
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

            this.scene.launch("playGameScene", {numLevel: playGameScene.currentLevel === 0 ? 1 : 0});
            this.scene.launch("UIPlayScene", {playGameScene: playGameScene});

            this.scene.stop();
        }, this);
    }

    /**
     * Отрисовать частицы.
     */
    addWinParticlesAnimation() {
        let particles = this.add.particles('tiles');
        particles.setDepth(0);

        // плавно появляющиеся частицы в случайном месте
        particles.createEmitter({
            blendMode: 'ADD',
            frame: {frames: ["yellow", "blue", "yellow"], cycle: true, quantity: 4},
            scale: {start: 0.1, end: 0},
            alpha: {start: 0, end: 0.8},
            speed: {min: -30, max: 30},
            lifespan: 5000,
            maxParticles: 50,
            frequency: 400,

            emitZone: {
                source: new Phaser.Geom.Rectangle(0, 0, store.baseConfig.gameWidth, store.baseConfig.gameHeight),
                type: 'random',
                yoyo: true
            }
        });

        // вспышка из частиц по контуру модального окна
        const first = this.containerWindow.list[1];
        const last = this.containerWindow.list[this.containerWindow.length - 1];
        particles.createEmitter({
            frame: {frames: ["yellow", "blue", "yellow"], cycle: true, quantity: 4},
            lifespan: 2600,
            speedY: {min: -180, max: 70},
            speedX: {min: -100, max: 100},
            angle: -90,
            scale: {start: 0.1, end: 0},
            gravityY: 70,
            quantity: 50,
            maxParticles: 300,
            blendMode: 'ADD',
            emitZone: {
                source: new Phaser.Geom.Rectangle(first.getLeftCenter().x, first.getTopCenter().y, last.displayWidth, last.getBottomCenter().y - first.getTopCenter().y),
                type: 'edge',
                quantity: 60
            }
        });
    }


    /**
     * Анимировать появление сцены.
     */
    animateShowScene() {

        this.groupWindowContent.setAlpha(0);

        this.containerWindow.setScale(0);
        this.containerWindow.setPosition(store.baseConfig.centreScreen.x, store.baseConfig.centreScreen.y);

        // увеличение модального окна
        this.tweens.add({
            targets: this.containerWindow,
            x: 0,
            y: 0,
            scaleX: 1,
            scaleY: 1,
            duration: 400,
            ease: 'Power2',
            onComplete: () => {
                // плавное появление содержимого окна
                this.tweens.add({
                    targets: this.groupWindowContent.getChildren(),
                    alpha: 1,
                    duration: 200,
                    ease: 'Power2'
                });
            }
        });

        this.time.delayedCall(300, this.addWinParticlesAnimation, [], this);

    }

}
