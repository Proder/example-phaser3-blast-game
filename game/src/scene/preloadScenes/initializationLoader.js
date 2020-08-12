import Phaser from "phaser";


export default class initializationLoader extends Phaser.Scene {
    constructor() {
        super("initializationLoader");

        console.log("initializationLoader: constructor")
    }

    preload() {
        console.log("initializationLoader -> preload");

        this.load.atlas('progressBar', 'assets/sprites/progressBar/spritesheet_progressBar.png', 'assets/sprites/progressBar/spritesheet_progressBar.json');
        this.load.image('footing', 'assets/sprites/footing.png');
    }

    create() {
        console.log("initializationLoader -> create");


        this.scene.start("preloadAssets");
        this.scene.stop();
    }

}
