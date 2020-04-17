import Entity from './Entity';
import TileMap from './TileMap/TileMap';
import Tile from './TileMap/Tile';

export default class Game {

    static readonly TILE_SIZE = 75;

    private static instance?: Game;
    private entities: Entity[] = [];
    private tileMap!: TileMap;

    // canvas and context must be set before starting the game
    canvas!: HTMLCanvasElement;
    context!: CanvasRenderingContext2D;

    private constructor() {
        window.addEventListener('keypress', e => {
            console.log(e);
            switch (e.key) {
                case 'a':
                    break;
                case 'd':
                    break;
                case 'w':
                    break;
                case 's':
            }
        });

        window.addEventListener('resize', () => {
            this.alignCanvas();
        });

    }

    static setCanvas(canvas: HTMLCanvasElement): Game {
        const game = Game.get();
        game.canvas = canvas;
        game.context = (canvas.getContext('2d') as CanvasRenderingContext2D);
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

    static registerEntity(entity: Entity) {
        Game.get().entities.push(entity);
    }

    static deregisterEntity(entity: Entity) {
        const entities = Game.get().entities;
        for (let i = 0; i <= entities.length; i++) {
            if (entities[i] === entity) {
                entities.splice(i, 1);
                return;
            }
        }
    }

    start(): void {
        if (!this.canvas || !this.context) {
            console.error('Game:start - Game cannot be started before setting the canvas');
        }

        this.loop();
    }


    private execCalc() {
        // do stuff
    }

    private execDraw(): void {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.tileMap = new TileMap();
        this.tileMap.load();

        this.tileMap.render();

        //
        // this.entities.forEach((entity) => {
        //     entity.render(this.context);
        // });
    }

    private loop(): void {

        // this.fetchEvents();
        this.execCalc();
        this.execDraw();
        // requestAnimationFrame(() => {
        //     this.loop();
        // });
    }

    private alignCanvas() {
        if (!this.canvas) {
            console.error('Game:alignCanvas - canvas is not set');
            return;
        }

        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
        this.execDraw()
    }

}
