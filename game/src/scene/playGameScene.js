import {store} from "../store/";
import GameBoard from "../components/GameBoard";


export default class playGameScene extends Phaser.Scene {

    constructor() {
        super("playGameScene");

        this.animationCounter = 0;
    }

    preload() {
        console.log("playGameScene: preload")

    }

    create() {
        console.log("playGameScene: create");

        // создаем игровое поле.
        const gameBoard = new GameBoard(this);
        gameBoard.renderBoardForm();
        gameBoard.fillBoard();
    }
}
