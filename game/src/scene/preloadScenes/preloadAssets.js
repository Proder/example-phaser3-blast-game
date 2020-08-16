import Phaser from "phaser";
import {store} from "../../store";

export default class preloadAssets extends Phaser.Scene {
    constructor() {
        super("preloadAssets");
    }

    preload() {
        console.log("preloadAssets -> preload");

        this.drawPreload();

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
        }
    }

    create() {
        console.log("preloadAssets -> create");


        const playGameScene = this.scene.get("playGameScene");
        playGameScene.scene.start();

        this.scene.start("UIPlayScene", {playGameScene: playGameScene});
        this.scene.stop();
    }

    /**
     * todo: Визуализация предзагрузки.
     */
    drawPreload() {
        let posYLoaderProgressBar = store.baseConfig.centreScreen.y;

        this.add.sprite(store.baseConfig.centreScreen.x, store.baseConfig.centreScreen.y, "footing").setScale(0.4);

        this.add.sprite(store.baseConfig.centreScreen.x, store.baseConfig.centreScreen.y + 30, "progressBar", "progress_fon").setScale(0.4);
        let loadingProgress = this.add.sprite(store.baseConfig.centreScreen.x, store.baseConfig.centreScreen.y + 30, "progressBar", "progress").setScale(0.4);

        let shapeExp = this.make.graphics().setDepth(1).fillStyle(0x0000ff).beginPath();
        shapeExp.fillRect(-store.baseConfig.centreScreen.x, posYLoaderProgressBar, 609, 60);

        let mask = shapeExp.createGeometryMask();
        loadingProgress.setMask(mask);

        this.load.on('progress', function (value) {
            shapeExp.x = (loadingProgress.x - 606) + (value * 606);
        });
    }
}

