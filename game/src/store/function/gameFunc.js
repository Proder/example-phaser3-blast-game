export default class gameFunc {
    constructor() {
        this.store = {};
    }

    getRectangle(sprite) {
        return new Phaser.Geom.Rectangle(sprite.x - 1 / 2 * sprite.width, sprite.y - 1 / 2 * sprite.height, sprite.width, sprite.height);
    }

    /**
     * Отрисовка подложки модального окна (фона)
     * @layers - count layaers (подложек)
     * @scale - optional
     * @depth - optional
     */
    drawModal(context, group, position, layers, scale = 0.4, depth = 12) {
        const height = {
            top: 99 * scale,
            center: 99 * scale,
        };


        group.add(context.add.sprite(position.x, position.y - 10, "header").setDepth(depth).setScale(scale));

        group.add(context.add.sprite(position.x, position.y, "window", "win-top").setDepth(depth).setScale(scale));
        for (let i = 0; i < layers; i++)
            group.add(context.add.sprite(position.x, (position.y + height.top + i * height.center), "window", "win-center").setDepth(depth).setScale(scale));
        group.add(context.add.sprite(position.x, (position.y + height.top + layers * height.center), "window", "win-bottom").setDepth(depth).setScale(scale));
    }

    /**
     * Отрисовка подложки внутри модального окна
     */
    drawInModal(context, group, posY, layers, depth = 124, back = "window_back-json", scale = [1, 1]) { // "yellow_podlojka-json"
        const posX = this.store.baseConfig.centreScreen.x;

        let height = 28, marginTop = 100;
        let top = context.add.sprite(posX, marginTop + posY, back, "win-top").setDepth(depth).setScale(scale[0], scale[1]);
        group.add(top);
        for (let i = 1; i <= layers; i++)
            group.add(context.add.sprite(posX, marginTop + posY + i * height, back, "win-center").setDepth(depth).setScale(scale[0], scale[1]));
        let bottom = context.add.sprite(posX, marginTop + posY + (layers + 1) * height - 6, back, "win-bottom").setDepth(depth).setScale(scale[0], scale[1]);
        group.add(bottom);
        return {top: top, bottom: bottom};
    }
}
