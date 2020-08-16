import Phaser from "phaser";

import initializationLoader from "./scene/preloadScenes/initializationLoader";
import preloadAssets from "./scene/preloadScenes/preloadAssets";
import playGameScene from "./scene/playGameScene";
import UIPlayScene from "./scene/UIPlayScene";
import WinScene from "./scene/endGameScene/winScene";
import LoseScene from "./scene/endGameScene/loseScene";


const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser-example',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 608,
        height: 1080
    },
    backgroundColor: '#a1a1a1',
    scene: [initializationLoader, preloadAssets, playGameScene, UIPlayScene, WinScene, LoseScene]
};

const game = new Phaser.Game(config);
