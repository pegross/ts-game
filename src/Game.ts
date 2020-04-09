import Entity from './Entity';
import Player from './Player';
import Bullet from './Bullet';
import { DirectionX, DirectionY } from './enums';
import Settings from './Settings';

export default class Game {

    private static instance?: Game;
    private entities: Entity[] = [];

    // canvas and context must be set before starting the game
    canvas!: HTMLCanvasElement;
    context!: CanvasRenderingContext2D;

    private playerDirX: DirectionX = DirectionX.NONE;
    private playerDirY: DirectionY = DirectionY.NONE;

    private currentTick = 0;
    private lastTick = 0;
    private lastDraw = 0;

    private constructor() {
        window.addEventListener('keypress', e => {
            console.log(e);

            switch (e.key) {
                case 'a':
                    this.playerDirX = DirectionX.LEFT;
                    break;
                case 'd':
                    this.playerDirX = DirectionX.RIGHT;
                    break;
                case 'w':
                    this.playerDirY = DirectionY.UP;
                    break;
                case 's':
                    this.playerDirY = DirectionY.DOWN;
            }

            if (e.key !== 'a' && e.key !== 'd') {
                this.playerDirX = DirectionX.NONE;
            }

            if (e.key !== 'w' && e.key !== 's') {
                this.playerDirY = DirectionY.NONE;
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

    start(): void {

        if (!this.canvas || !this.context) {
            console.error('Game:start - Game cannot be started before setting the canvas');
        }

        // tslint:disable-next-line:no-unused-expression
        new Player();
        this.loop();
    }

    static getHeight(): number {
        const game = Game.get();
        if (!game.canvas) {
            return 0;
        }
        return game.canvas.height;
    }

    static getWidth(): number {
        const game = Game.get();
        if (!game.canvas) {
            return 0;
        }
        return game.canvas.width;
    }

    private execCalc() {
        this.entities.forEach((entity) => {
            if (entity instanceof Player) {
                entity.move(this.playerDirX, this.playerDirY, 1);
            }
        });
    }

    private execDraw(): void {
        const sinceLastDraw = this.currentTick - this.lastDraw;
        if (!(this.lastDraw <= 0 || sinceLastDraw > 1000 / Settings.fps)) {
            return;
        }
        this.lastDraw = this.currentTick;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.entities.forEach((entity) => {
            entity.render(this.context);
        });
    }

    private loop(): void {
        console.log('loop');

        const now = new Date();
        console.log(now.getTime());
        this.currentTick = now.getTime();
        const timePassed = this.lastTick - this.currentTick;
        this.lastTick = this.currentTick;

        // this.fetchEvents();
        this.execCalc();
        this.execDraw();
        requestAnimationFrame(() => {
            this.loop();
        });
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
