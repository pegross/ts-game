import Entity from './Entity/Entity';
import TileMap from './TileMap/TileMap';
import Tile from './TileMap/Tile/Tile';
import Player from './Entity/Player';

export default class Game {

    static readonly TILE_SIZE = 75;

    private static instance?: Game;
    private tileMap!: TileMap;

    // canvas and context must be set before starting the game
    canvasFront!: HTMLCanvasElement;
    canvasBack!: HTMLCanvasElement;
    contextFront!: CanvasRenderingContext2D;
    contextBack!: CanvasRenderingContext2D;

    private constructor() {
        window.addEventListener('resize', () => {
            this.alignCanvas();
        });

    }

    static setCanvas(canvasBack: HTMLCanvasElement, canvasFront: HTMLCanvasElement): Game {
        const game = Game.get();
        game.canvasBack = canvasBack;
        game.canvasFront = canvasFront;
        game.contextBack = (canvasBack.getContext('2d') as CanvasRenderingContext2D);
        game.contextFront = (canvasFront.getContext('2d') as CanvasRenderingContext2D);
        game.alignCanvas();

        return game;
    }

    static get(): Game {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new this();
        return this.get();
    }

    start(): void {
        if (!this.canvasBack || !this.contextBack || !this.canvasFront || !this.canvasFront) {
            console.error('Game:start - Game cannot be started before setting the canvas');
        }

        // tslint:disable-next-line:no-unused-expression
        new Player(1, 1);

        this.turn();
    }


    private execCalc() {
        // do stuff
    }

    private execDraw(): void {
        this.contextFront.clearRect(0, 0, this.canvasFront.width, this.canvasFront.height);
        this.contextBack.clearRect(0, 0, this.canvasBack.width, this.canvasBack.height);
        this.tileMap = TileMap.get();
        this.tileMap.load();
        this.tileMap.render();
    }

    // Everything takes it's turn. Turns are mostly triggered by player movement
    turn(): void {
        console.log('Another turn has passed.');
        this.execCalc();
        this.execDraw();
    }

    private alignCanvas() {
        if (!this.canvasBack || !this.canvasFront) {
            console.error('Game:alignCanvas - canvas is not set');
            return;
        }

        const width = this.canvasBack.clientWidth;
        const height = this.canvasBack.clientHeight;

        this.canvasBack.width = width;
        this.canvasBack.height = height;
        this.canvasFront.width = width;
        this.canvasFront.height = height;

        this.execDraw()
    }

}
