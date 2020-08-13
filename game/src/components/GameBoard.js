import {boardForm} from "./testData";
import Tile from "./Tile";

/**
 * Игровое поле.
 */
export default class GameBoard {
    constructor(scene) {
        console.log("GameBoard constructor");

        this.scene = scene;

        this.board = {
            width: 5,
            height: 5,
            boardForm: []
        };
        this.board.boardForm = boardForm;

        // временный объект для построения игрового поля
        this.startPosition = {
            x: 120,
            y: 330,
            xMargin: 94,
            yMargin: 94
        };

        // есть ли в данный момент перемещающиеся фишки
        this.countMovedTiles = 0;

        // количество свеже заполненных линий для учитывания задерки анимации
        this.countNewLineTile = 1;
    }

    /**
     * Построить игровое поле
     */
    renderBoardForm() {

        for (let i = 0; i < this.board.height; i++) {
            let y = this.startPosition.y + this.startPosition.yMargin * i;

            for (let j = 0; j < this.board.width; j++) {
                let x = this.startPosition.x + this.startPosition.xMargin * j;

                const boardItem = this.board.boardForm[i][j];
                boardItem.tile = null;

                boardItem.position = {
                    x: x,
                    y: y
                };

                if (boardItem.visible) {
                    this.scene.add.sprite(x, y, "backgroundBoard").setScale(0.55);

                    // перемещается ли сейчас фишка в данную ячейку
                    boardItem.nowMoved = false;
                }
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
                    let delay = 300 * this.countNewLineTile;
                    let isNewTile;
                    [boardItem.tile, isNewTile] = this.searchTileForMove(i, j, boardItem);

                    if (isNewTile) {
                        flagNewTileLine = true;
                    } else {
                        delay = 0;
                        this.board.boardForm[boardItem.tile.boartPosition.i][boardItem.tile.boartPosition.j].tile = null;
                    }


                    boardItem.tile.boartPosition = {
                        i: i,
                        j: j
                    };

                    boardItem.tile.board = this;

                    // Переменная для создания имитации отскока фишки при падении.
                    const repeatPos = {
                        x: Math.abs(boardItem.tile.x - boardItem.position.x) * 0.01,
                        y: Math.abs(boardItem.tile.y - boardItem.position.y) * 0.01,
                    };

                    // проверка на необходимость запуска анимации. (чтобы избежать излишней задержки перед следующим ходом)
                    if (boardItem.tile.x !== boardItem.position.x || boardItem.tile.y !== boardItem.position.y) {
                        this.countMovedTiles++;

                        // анимация перемещения фишки
                        this.scene.tweens.add({
                            targets: boardItem.tile,
                            x: boardItem.position.x,
                            y: boardItem.position.y,
                            delay: delay,
                            duration: 400,
                            ease: 'Cubic.easeIn',
                            onComplete: () => {
                                if (repeatPos.x !== 0 || repeatPos.y !== 0) {

                                    // анимация отскока фишки. (имитация падения)
                                    this.scene.tweens.add({
                                        targets: boardItem.tile,
                                        x: "-=" + repeatPos.x,
                                        y: "-=" + repeatPos.y,
                                        duration: 50,
                                        yoyo: true,
                                        ease: 'Sine.easeInOut',
                                        onComplete: () => {
                                            this.countMovedTiles--;
                                        },
                                    });
                                } else {
                                    this.countMovedTiles--;
                                }
                            },
                        });
                    }
                }
            }

            if (flagNewTileLine) {
                flagNewTileLine = false;
                this.countNewLineTile++;
            }
        }
        this.countNewLineTile = 1;
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
            let nextI = boardItem.moveOf[0].i;
            let nextJ = boardItem.moveOf[0].j;
            let nextBoardItem = this.board.boardForm[nextI][nextJ];
            if (nextBoardItem.tile !== null && nextBoardItem.tile.active) {
                return [nextBoardItem.tile, false];
            } else
                return this.searchTileForMove(i, j, nextBoardItem);
        } else {
            // Создать новую фишку. (todo: не предусматриваю переиспользование удаляемых объектов)
            const newTile = new Tile(this.scene, boardItem.position.x, boardItem.position.y);
            this.scene.add.existing(newTile);

            this.scene.tweens.add({
                targets: newTile,
                scaleX: 0.55,
                scaleY: 0.55,
                alpha: 1,
                delay: 300 * this.countNewLineTile,
                duration: 200,
                ease: 'Sine.easeInOut'
            });
            return [newTile, true];
        }

    }

    /**
     * Проветка возможности хода. (Проверяет наличие фишек нужного типа в соседних ячейках)
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
            this.board.boardForm[i][j].tile.destroy();

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
     * Совпадает ли содержимое указанной ячейки с проверяемым типом фишек.
     * @param i - позиция ячейки для проверки. (int)
     * @param j - позиция ячейки для проверки. (int)
     * @param type - тип фишки для проверки. (string)
     * @returns {boolean} - найдено ли совпадение.
     */
    check(i, j, type) {
        return !!this.board.boardForm[i] && !!this.board.boardForm[i][j] && this.board.boardForm[i][j].visible && this.board.boardForm[i][j].tile.tileType === type;
    }

}
