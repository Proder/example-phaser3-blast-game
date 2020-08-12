export default class store {
    constructor() {

        this.baseConfig = {
            gameWidth: 608,
            gameHeight: 1080,
            centreScreen: {}
        };

        this.baseConfig.centreScreen.x = this.baseConfig.gameWidth / 2;
        this.baseConfig.centreScreen.y = this.baseConfig.gameHeight / 2;

    }

}
