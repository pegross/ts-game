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
                const side = Game.isCollision(entity, check);
                if (side) {
                    console.log('collision');
                    entity.onCollision(check, side);
                    check.onCollision(entity, side);
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
        if (p.left <= q.right && p.right >= q.left) {
            if (p.top <= q.bottom && p.bottom >= q.top) {

                let penetrationTop = 0;
                let penetrationRight = 0;
                let penetrationBottom = 0;
                let penetrationLeft = 0;

                // Calculate penetration depth
                if (q.left < p.left && p.left < q.right && q.right < p.right) {
                    penetrationLeft = q.right - p.left;
                    if (p instanceof Player) {
                        console.log('Pen Left' + penetrationLeft);
                    }
                }

                if (p.left < q.left && q.left < p.right && p.right < q.right) {
                    penetrationRight = p.right - q.left;
                    if (p instanceof Player) {
                        console.log('Pen Right' + penetrationRight);
                    }
                }

                if (q.top < p.top && p.top < q.bottom && q.bottom < p.bottom) {
                    penetrationTop = q.bottom - p.top;
                    if (p instanceof Player) {
                        console.log('Pen Top' + penetrationTop);
                    }
                }

                if (p.top < q.top && q.top < p.bottom && p.bottom < q.bottom) {
                    penetrationBottom = p.bottom - q.top;
                    if (p instanceof Player) {
                        console.log('Pen Bottom' + penetrationBottom);
                    }
                }

                const maxPenetration = Math.max(penetrationLeft, penetrationRight, penetrationTop, penetrationBottom);

                if (maxPenetration === 0) {
                    return false;
                }

                switch (maxPenetration) {
                    case penetrationTop:
                        return Side.TOP;
                    case penetrationBottom:
                        return Side.BOTTOM;
                    case penetrationRight:
                        return Side.RIGHT;
                    case penetrationLeft:
                        return Side.LEFT;
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
