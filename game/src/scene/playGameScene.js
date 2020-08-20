import {store} from "../store/";
import GameBoard from "../controler/GameBoard";
import {globalTranslations, local} from "../localization/local";


export default class playGameScene extends Phaser.Scene {

    constructor() {
        super("playGameScene");

        this.delayShowWinLoseScene = 1000;
    }

    init(data) {
        this.currentLevel = data.numLevel;

        this.removeListener();
    }

    create() {
        console.log("playGameScene: create");

        this.userGameParam = this.initUserGameParam();

        this.UIPlayScene = this.scene.get("UIPlayScene");


        // создаем игровое поле.
        this.gameBoard = new GameBoard(this);

        // масштабируем игровое поле
        this.cameras.main.zoom = this.gameBoard.board.scale;

        // заполнияем игровое поле
        this.gameBoard.buildBoardForm();
        this.gameBoard.fillBoard();

        this.initEventListener();
    }

    /**
     * Инициализироть необходимые слушатели событий.
     */
    initEventListener() {
        const context = this;
        this.events.on('changeScore', function (data) {
            console.log("PlayScene changeScore", data);

            context.userGameParam.score += Math.pow(data.countRemoveTiles, 2);
            context.userGameParam.step++;

            context.UIPlayScene.events.emit('level_progress', context.userGameParam.score / context.gameBoard.task[context.currentLevel].needScore);
            context.UIPlayScene.events.emit('changeScore', context.userGameParam.score);
            context.UIPlayScene.events.emit('changeStepCount', context.gameBoard.task[context.currentLevel].maxStep - context.userGameParam.step);
        });
    }


    /**
     * Удалить созданные слушатели. (перед закрытием сцены)
     */
    removeListener() {
        console.log("removeListener");

        this.events.off("changeScore");
    }

    /**
     * Возвращает объект с игровыми параметрами игрока. todo: создать компонент игрока.
     * @returns {{score: number, step: number}}
     */
    initUserGameParam() {
        return {
            score: 0,
            step: 0,
        };
    }

    /**
     * Проверка состояния игры. (победа/поражение/наличе ходов)
     */
    checkStatusGame() {

        if (this.checkWinGame()) {
            const context = this;
            setTimeout(() => {
                context.scene.pause();
                context.scene.launch("winScene", {playGameScene: playGameScene});
            }, this.delayShowWinLoseScene);

            return;
        }

        if (this.checkLoseGame()) {
            const context = this;
            setTimeout(() => {
                context.scene.pause();
                context.scene.launch("loseScene", {playGameScene: playGameScene});
            }, this.delayShowWinLoseScene);
            return;
        }
    }

    /**
     * Проверка условий прохождения уровня.
     * @returns {boolean}
     */
    checkWinGame() {
        if (this.userGameParam.score >= this.gameBoard.task[this.currentLevel].needScore)
            return true;
        else
            return false;
    }

    /**
     * Проверка условий поражения на уровне.
     * @returns {boolean}
     */
    checkLoseGame() {
        // есть ли доступные игроку ходы.
        if (!this.gameBoard.checkHaveMove()) {

            // есть ли доступное игроку перемешивания игрового поля
            if (this.gameBoard.countBoardResort === 0) {
                return true;
            } else {
                // декрементируем количество перемешиваний игрового поля
                this.gameBoard.countBoardResort--;

                // перемешиваем игровое поля. (фактически удаляем все фишки и заполняем поле заного)
                const context = this;
                const callback = () => {
                    context.gameBoard.deleteAllTiles();
                    context.gameBoard.fillBoard();
                };

                this.time.delayedCall(1000, this.UIPlayScene.messageView, [globalTranslations[local].dontMove, callback], this.UIPlayScene);
            }
        }

        return this.gameBoard.task[this.currentLevel].maxStep === this.userGameParam.step;
    }


}
