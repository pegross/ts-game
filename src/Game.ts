import Entity from "./Entity";
import Player from "./Player";
import Bullet from "./Bullet";
import { DirectionX, DirectionY } from "./enums";
import Settings from "./Settings";

export default class Game {

    private static instance?: Game;
    private entities: Entity[] = [];

    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    private playerDirX: DirectionX = DirectionX.NONE;
    private playerDirY: DirectionY = DirectionY.NONE;

    private currentTick: number = 0;
    private lastTick: number = 0;
    private lastDraw: number = 0;

    private constructor(canvas: HTMLCanvasElement) {
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

            if(e.key !== 'a' && e.key !== 'd') {
                this.playerDirX = DirectionX.NONE;
            }

            if(e.key !== 'w' && e.key !== 's') {
                this.playerDirY = DirectionY.NONE;
            }
        });

        this.canvas = canvas;
        this.context = <CanvasRenderingContext2D>canvas.getContext('2d');
        this.alignCanvas();
        window.addEventListener('resize', () => {
            this.alignCanvas();
        });
    }

    public static make(canvas: HTMLCanvasElement): Game {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new this(canvas);
        return this.make(canvas);
    }

    public static get(): Game | undefined {
        return this.instance;
    }

    public registerEntity(entity: Entity) {
        this.entities.push(entity);
    }

    public start(): void {
        new Player();

        this.loop();
    }

    public execCalc() {
        this.entities.forEach((entity) => {
            if (entity instanceof Player) {
                entity.move(this.playerDirX, this.playerDirY, 1);
            }
        });
    }

    public execDraw(): void {
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

    public loop(): void {
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

    alignCanvas() {
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
        this.execDraw()
    }

}