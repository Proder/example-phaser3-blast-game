/**
 * Класс отрисовки игрового поля
 */
export default class ViewBoard {
    constructor(gameBoardController) {
        this.controller = gameBoardController;

        this.delayNewTile = 300;

        this.createTilesParticlesEmitter();
    }

    /**
     * Добавляет подложку под ячейку игрового поля
     */
    AddBackgroundTile(x, y) {
        this.controller.scene.add.sprite(x, y, "backgroundBoard").setScale(0.55);
    }

    /**
     * Запустить анимацию создания фишки.
     * @param tile - игровая фишка. (object)
     */
    NewTileAnimation(tile) {
        this.controller.scene.tweens.add({
            targets: tile,
            scaleX: 0.55,
            scaleY: 0.55,
            alpha: 1,
            delay: this.delayNewTile * this.controller.countNewLineTile,
            duration: 200,
            ease: 'Sine.easeInOut'
        });
    }

    /**
     * Запустить анимацию перемещения фишки.
     * @param boardItem - элемент игрового поля. (object)
     * @param isNewTile - новая ли фишка (bool)
     */
    MoveTileAnimation(boardItem, isNewTile) {
        // задержка перед началом анимации перемещения фишки
        let delayAnimation = 0;

        if (isNewTile) {
            // для новых фишек требуется задерка перед началом анимации перемещения.
            delayAnimation = this.delayNewTile * this.controller.countNewLineTile;
        }


        // Переменная для создания имитации отскока фишки при падении.
        const repeatPos = {
            x: Math.abs(boardItem.tile.x - boardItem.position.x) * 0.01,
            y: Math.abs(boardItem.tile.y - boardItem.position.y) * 0.01,
        };

        // проверка на необходимость запуска анимации. (чтобы избежать излишней задержки перед следующим ходом)
        if (boardItem.tile.x !== boardItem.position.x || boardItem.tile.y !== boardItem.position.y) {
            this.controller.countMovedTiles++;

            // анимация перемещения фишки
            this.controller.scene.tweens.add({
                targets: boardItem.tile,
                x: boardItem.position.x,
                y: boardItem.position.y,
                delay: delayAnimation,
                duration: 400,
                ease: 'Cubic.easeIn',
                onComplete: () => {

                    // анимация отскока фишки. (имитация падения)
                    this.controller.scene.tweens.add({
                        targets: boardItem.tile,
                        x: "-=" + repeatPos.x,
                        y: "-=" + repeatPos.y,
                        duration: 50,
                        yoyo: true,
                        ease: 'Sine.easeInOut',
                        onComplete: () => {
                            this.controller.countMovedTiles--;
                        },
                    });

                },
            });
        }
    }

    /**
     * Запустить анимацию удаления фишки.
     */
    RemoveTileAnimation(tile, position, frame) {
        this.explodeTilesParticlesEmitter(position, frame);

        this.controller.scene.tweens.add({
            targets: tile,
            scaleX: 0,
            scaleY: 0,
            duration: 600,
            ease: 'Sine.easeInOut',
            onComplete: () => {
                tile.destroy();
            }
        });
    }


    /**
     * Создать emitter частиц для анимации уничножения фишек.
     */
    createTilesParticlesEmitter() {
        const particles = this.controller.scene.add.particles('tiles').setDepth(10);

        this.tilesEmitter = particles.createEmitter({
            frame: 'red',
            x: 0, y: 0,
            lifespan: {min: 400, max: 1200},
            quantity: 4,
            scale: {start: 0.3, end: 0},
            alpha: {start: 0.5, end: 0},
            speed: 100,
            gravityY: 550,
            blendMode: 'ADD'
        }).stop();
    }

    /**
     * Выпустить поток частиц в указанном месте.
     * @param position - координаты запуска частиц. (object {x, y})
     * @param frame - наименование фрейма частиц. (string)
     */
    explodeTilesParticlesEmitter(position, frame) {
        this.tilesEmitter.setFrame(frame);
        this.tilesEmitter.setPosition(position.x, position.y);
        this.tilesEmitter.explode();
    }

}
