import Entity from './Entity';
import Player from './Player';
import Bullet from './Bullet';
import { DirectionX, DirectionY, Side } from './enums';
import Settings from './Settings';
import Wall from './Wall';

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
    private timePassed = 0;

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
        // tslint:disable-next-line:no-unused-expression
        new Wall(100, 40, 50, 500);
        this.loop();
    }

    static getEntities(): Entity[] {
        return Game.get().entities;
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

            this.entities.forEach((check) => {
                if (Game.isCollision(entity, check)) {
                    console.log('collision');
                    entity.onCollision(check);
                    check.onCollision(entity);
                }
            });

            if (entity instanceof Player) {
                entity.color = 'blue';
                entity.move(this.playerDirX, this.playerDirY, this.timePassed);
            }

            // TODO: move other entities
        });
    }

    static isCollision(p: Entity, q: Entity): Side | false {
        if (!p.canCollide || !q.canCollide || p === q) {
            return false;
        }

        // Main collision handling algorithm (Axis Aligned Bounding Box)
        if (p.getX() < q.getX() + q.getWidth() && p.getX() + p.getWidth() > q.getX()) {
            if (p.getY() < q.getY() + q.getHeight() && p.getY() + p.getHeight() > q.getY()) {

                // Collision happened. Detect which side is closest to collision
                const deltaX = q.getX() > p.getX() ? q.getX() - p.getX() + p.getWidth() : p.getX() - q.getX() + q.getWidth();
                const deltaY = q.getY() > p.getY() ? q.getY() - p.getY() + p.getHeight() : p.getX() - q.getX() + q.getHeight();
                console.log('deltaX ' + deltaX);
                console.log('deltaY ' + deltaY);

                if (deltaX < deltaY) {
                    if (q.getX() > p.getX() + p.getWidth()) {
                        return Side.RIGHT
                    } else {
                        return Side.LEFT;
                    }
                }

                if (q.getY() > p.getY() + p.getHeight()) {
                    return Side.TOP
                } else {
                    return Side.BOTTOM;
                }
            }
        }

        return false;
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
        const now = new Date();
        this.currentTick = now.getTime();
        this.timePassed = this.lastTick - this.currentTick;
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
