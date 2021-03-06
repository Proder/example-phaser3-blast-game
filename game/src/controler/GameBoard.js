import {store} from "../store/";
import {dataLevels} from "../components/testData";
import Tile from "../components/Tile";
import ViewBoard from "../components/ViewBoard";

/**
 * Контроллейр игрового поля.
 */
export default class GameBoard {
    constructor(scene) {
        console.log("GameBoard constructor");

        this.scene = scene;


        this.board = dataLevels[this.scene.currentLevel];

        this.board.boardView = new ViewBoard(this);

        // временный массив заданий. todo: создать questManager.
        this.task = [{
            needScore: 100,
            maxStep: 10
        }, {
            needScore: 200,
            maxStep: 12
        }];

        // объект для построения игрового поля. Центрирование игрового поля и ратояние между фишками.
        this.startPosition = {
            x: store.baseConfig.centreScreen.x - 94 * (this.board.width / 2),
            y: store.baseConfig.centreScreen.y - 94 * (this.board.height / 2),
            xMargin: 94,
            yMargin: 94
        };

        // Количество перемещаймых в данный момент фишек
        this.countMovedTiles = 0;

        // Количество свеже заполненных линий для учитывания задерки анимации
        this.countNewLineTile = 1;

        // Количество удаленных за текущий ход фишек
        this.countRemoveTiles = 0;

        // Количество доступных в данных момент перемешиваний поля при отсутствии ходов.
        this.countBoardResort = store.globalGameSettings.countBoardResort;
    }

    /**
     * Построить игровое поле
     */
    buildBoardForm() {

        for (let i = 0; i < this.board.height; i++) {
            const y = this.startPosition.y + this.startPosition.yMargin * i;

            for (let j = 0; j < this.board.width; j++) {
                const x = this.startPosition.x + this.startPosition.xMargin * j + this.startPosition.xMargin / 2;

                const boardItem = this.board.boardForm[i][j];
                boardItem.tile = null;

                boardItem.position = {
                    x: x,
                    y: y
                };

                if (boardItem.visible)
                    this.board.boardView.AddBackgroundTile(x, y);

            }
        }

    }

    /**
     * Заполнить игровое поле
     */
    fillBoard() {
        for (let i = this.board.height - 1; i >= 0; i--) {
            let flagNewTileLine = false;

            for (let j = this.board.width - 1; j >= 0; j--) {
                const boardItem = this.board.boardForm[i][j];

                if (boardItem.visible && (boardItem.tile === null || !boardItem.tile.active)) {

                    let isNewTile;
                    [boardItem.tile, isNewTile] = this.searchTileForMove(i, j, boardItem);

                    if (isNewTile) {
                        flagNewTileLine = true;
                    } else {
                        // зануляем ссылку в ячейке из которой перемещаем фишку
                        this.board.boardForm[boardItem.tile.boartPosition.i][boardItem.tile.boartPosition.j].tile = null;
                    }


                    boardItem.tile.boartPosition = {
                        i: i,
                        j: j
                    };

                    boardItem.tile.board = this;

                    this.board.boardView.MoveTileAnimation(boardItem, isNewTile);
                }
            }

            if (flagNewTileLine) {
                flagNewTileLine = false;
                this.countNewLineTile++;
            }
        }

        this.countNewLineTile = 1;

        // Проверяйем наличие проигрыша/выигрыша
        this.scene.checkStatusGame();
    }

    /**
     * Поиск доступной фишки для заполнения пустой ячейки.
     * @param i - позиция ячейки в которую требуется фишка фишка. (int)
     * @param j - позиция ячейки в которую требуется фишка фишка. (int)
     * @param boardItem - ячейка поля для поиска фишки. (object)
     * @returns [object, boolean] - [фишка, новая ли фишка]
     */
    searchTileForMove(i, j, boardItem) {
        if (boardItem.moveOf.length > 0) {
            const nextI = boardItem.moveOf[0].i;
            const nextJ = boardItem.moveOf[0].j;

            const nextBoardItem = this.board.boardForm[nextI][nextJ];

            if (nextBoardItem.tile !== null && nextBoardItem.tile.active) {
                return [nextBoardItem.tile, false];
            } else
                return this.searchTileForMove(i, j, nextBoardItem);

        } else {
            // Создать новую фишку. (todo: не предусматриваю переиспользование удаляемых объектов)
            const newTile = new Tile(this.scene, boardItem.position.x, boardItem.position.y);
            this.scene.add.existing(newTile);

            // запуск анимации создания новой фишки
            this.board.boardView.NewTileAnimation(newTile);

            return [newTile, true];
        }

    }

    /**
     * Проветка возможности хода. (Проверяет наличие фишек указанного типа в соседних ячейках)
     * @param i - позиция ячейки рядом с которой нужно выполнить проверку. (int)
     * @param j - позиция ячейки рядом с которой нужно выполнить проверку. (int)
     * @param type - тип проверяемой фишки. (string)
     * @returns {boolean} - найдено ли совпадение.
     */
    checkMatch(i, j, type) {
        let match = this.check(i - 1, j, type);
        if (!match) match = this.check(i + 1, j, type);
        if (!match) match = this.check(i, j - 1, type);
        if (!match) match = this.check(i, j + 1, type);

        return match;
    }

    /**
     * Рекурсивное удаление фишек выбранного типа из указанной ячейки.
     * @param i - позиция ячейки рядом с которой проверяется наличие совпадающих фишек. (int)
     * @param j - позиция ячейки рядом с которой проверяется наличие совпадающих фишек. (int)
     * @param type - тип фишки для удаления. (string)
     */
    removeMatchTile(i, j, type) {
        if (this.board.boardForm[i][j].tile.active) {

            // Запуск анимации удаления фишки.
            this.board.boardView.RemoveTileAnimation(this.board.boardForm[i][j].tile, this.board.boardForm[i][j].position, this.board.boardForm[i][j].tile.tileType);

            // Зануляем ссылку на фишку
            this.board.boardForm[i][j].tile = null;
            this.countRemoveTiles++;


            if (this.check(i - 1, j, type)) {
                this.removeMatchTile(i - 1, j, type);
            }
            if (this.check(i + 1, j, type)) {
                this.removeMatchTile(i + 1, j, type);
            }
            if (this.check(i, j - 1, type)) {
                this.removeMatchTile(i, j - 1, type);
            }
            if (this.check(i, j + 1, type)) {
                this.removeMatchTile(i, j + 1, type);
            }
        }
    }

    /**
     * Проверка наличия доступных игроку ходов.
     * @returns {boolean}
     */
    checkHaveMove() {
        for (let i = 0; i < this.board.height - 1; i++) {
            for (let j = 0; j < this.board.width - 1; j++) {
                if (this.board.boardForm[i][j].tile !== null) {
                    const type = this.board.boardForm[i][j].tile.tileType;
                    if (this.check(i, j + 1, type)) {
                        return true;
                    }

                    if (this.check(i + 1, j, type)) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    /**
     * Удалить все фишки.
     */
    deleteAllTiles() {
        for (let i = 0; i < this.board.height; i++) {
            for (let j = 0; j < this.board.width; j++) {
                if (this.board.boardForm[i][j].tile !== null) {
                    // Запуск анимации удаления фишки.
                    this.board.boardView.RemoveTileAnimation(this.board.boardForm[i][j].tile, this.board.boardForm[i][j].position, this.board.boardForm[i][j].tile.tileType);

                    // Зануляем ссылку на фишку
                    this.board.boardForm[i][j].tile = null;
                }
            }
        }
    }

    /**
     * Совпадает ли содержимое указанной ячейки с указанным типом фишек.
     * @param i - позиция ячейки для проверки. (int)
     * @param j - позиция ячейки для проверки. (int)
     * @param type - тип фишки для проверки. (string)
     * @returns {boolean} - найдено ли совпадение.
     */
    check(i, j, type) {
        return this.board.boardForm[i] &&
            this.board.boardForm[i][j] &&
            this.board.boardForm[i][j].visible &&
            this.board.boardForm[i][j].tile &&
            this.board.boardForm[i][j].tile !== null &&
            this.board.boardForm[i][j].tile.tileType === type;
    }

}
