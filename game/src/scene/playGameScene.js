import {store} from "../store/";
import GameBoard from "../controler/GameBoard";
import {globalTranslations, local} from "../localization/local";


export default class playGameScene extends Phaser.Scene {

    constructor() {
        super("playGameScene");

    }

    preload() {
        console.log("playGameScene: preload")

    }

    create() {
        console.log("playGameScene: create");

        this.userGameParam = this.initUserGameParam();

        this.UIPlayScene = this.scene.get("UIPlayScene");

        // создаем игровое поле.
        this.gameBoard = new GameBoard(this);
        this.gameBoard.buildBoardForm();
        this.gameBoard.fillBoard();

        this.initEventListener();
    }


    initEventListener() {
        const context = this;
        this.events.on('changeScore', function (data) {
            console.log("PlayScene changeScore", data);

            context.userGameParam.score += Math.pow(data.countRemoveTiles, 2);
            context.userGameParam.step++;

            context.UIPlayScene.events.emit('level_progress', context.userGameParam.score / context.gameBoard.task.needScore);
            context.UIPlayScene.events.emit('changeScore', context.userGameParam.score);
            context.UIPlayScene.events.emit('changeStepCount', context.gameBoard.task.maxStep - context.userGameParam.step);
        });
    }

    initUserGameParam() {
        return {
            score: 0,
            step: 0,
        };
    }

    checkStatusGame() {

        if (this.checkWinGame()) {
            this.scene.start("winScene", {playGameScene: playGameScene});
            return;
        }
        if (this.checkLoseGame()) {
            this.scene.start("loseScene", {playGameScene: playGameScene});
            return;
        }
    }

    checkWinGame() {
        if (this.userGameParam.score >= this.gameBoard.task.needScore)
            return true;
        else
            return false;
    }

    checkLoseGame() {
        if (!this.gameBoard.checkHaveMove()) {
            if (this.gameBoard.countBoardResort === 0) {
                return true;
            } else {
                this.gameBoard.countBoardResort--;

                const context = this;
                const callback = () => {
                    context.gameBoard.deleteAllTiles();
                    context.gameBoard.fillBoard();
                };

                this.time.delayedCall(1000, this.UIPlayScene.messageView, [globalTranslations[local].dontMove, callback], this.UIPlayScene);
            }
        }

        return this.gameBoard.task.maxStep === this.userGameParam.step;
    }


}
