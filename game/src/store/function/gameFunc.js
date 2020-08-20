export default class gameFunc {
    constructor() {
        this.store = {};
    }


    addText(scene, text, position) {
        return scene.add.text(position.x, position.y, text,
            {
                fontFamily: 'Marvin',
                fontSize: 25,
                color: '#fff',
                align: 'center',
            })
            .setDepth(10).setOrigin(0.5);
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
}
