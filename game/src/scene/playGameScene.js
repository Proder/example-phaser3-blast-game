import {store} from "../store/";
import GameBoard from "../controler/GameBoard";


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


            if (context.checkWinGame()) {
                context.scene.start("winScene", {playGameScene: playGameScene});
                return;
            }
            if (context.checkLoseGame()) {
                context.scene.start("loseScene", {playGameScene: playGameScene});
                return;
            }
        });
    }

    initUserGameParam() {
        return {
            score: 0,
            step: 0,
        };
    }

    checkWinGame() {
        if (this.userGameParam.score >= this.gameBoard.task.needScore)
            return true;
        else
            return false;
    }

    checkLoseGame() {
        return this.gameBoard.task.maxStep === this.userGameParam.step;
    }

}
