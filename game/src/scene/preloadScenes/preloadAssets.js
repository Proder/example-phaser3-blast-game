import Phaser from "phaser";
import {store} from "../../store";

export default class preloadAssets extends Phaser.Scene {
    constructor() {
        super("preloadAssets");
    }

    preload() {
        console.log("preloadAssets -> preload");

        this.drawPreload();
    }

    create() {
        console.log("preloadAssets -> create");


        this.scene.start("playGameScene");
        this.scene.stop();
    }

    /**
     * todo: Визуализация предзагрузки.
     */
    drawPreload() {

    }
}

