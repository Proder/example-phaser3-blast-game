import Phaser from "phaser";


export default class initializationLoader extends Phaser.Scene {
    constructor() {
        super("initializationLoader");

        console.log("initializationLoader: constructor")
    }

    preload() {
        console.log("initializationLoader -> preload");

    }

    create() {
        console.log("initializationLoader -> create");


        this.scene.start("preloadAssets");
        this.scene.stop();
    }

}
