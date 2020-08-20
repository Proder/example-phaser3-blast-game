import {globalTranslations, local} from "../localization/local";

export default class store {
    constructor() {

        this.baseConfig = {
            gameWidth: 608,
            gameHeight: 1080,
            centreScreen: {x: 0, y: 0}
        };

        this.baseConfig.centreScreen.x = this.baseConfig.gameWidth / 2;
        this.baseConfig.centreScreen.y = this.baseConfig.gameHeight / 2;

        this.globalGameSettings = {
          countBoardResort: 1
        };

    }

}
