export default class Tile extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'tiles', 'red');

        this.setScale(0);
        this.setAlpha(0);

        this.setRandomFrame();

        this.setInteractive();
        this.on("pointerdown", this.clickEvent, this);
    }

    setRandomFrame() {
        const arr = Object.keys(this.texture.frames).filter(word => word !== "__BASE");

        this.tileType = arr[Math.floor(Math.random() * arr.length)];
        this.setFrame(this.tileType);
    }

    clickEvent() {
        console.log("clickEvent", this);

        const allowMove = this.board.checkMatch(this.boartPosition.i, this.boartPosition.j, this.tileType) && this.board.countMovedTiles === 0;

        if (allowMove) {
            this.board.removeMatchTile(this.boartPosition.i, this.boartPosition.j, this.tileType);
            this.board.fillBoard();
        }
    }
}
