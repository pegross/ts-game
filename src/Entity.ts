import Game from './Game';
import { DirectionX, DirectionY, Side, State } from './enums';
import { Collision, Position } from './interfaces';

export default abstract class Entity {

    canCollide: boolean;
    impassable: boolean;

    protected state: State;

    protected speed: number;
    protected posX: number;
    protected posY: number;
    protected width: number;
    protected height: number;

    protected isStopped = false;

    protected constructor(speed: number, posX: number, posY: number, width: number, height: number, canCollide = true, impassable = false) {
        this.state = State.IDLE;
        this.speed = speed;
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.canCollide = canCollide;
        this.impassable = impassable;

        Game.registerEntity(this);
    }

    // TODO: allow late adding of entities

    move(x: DirectionX, y: DirectionY, ms: number): void {
        ms = Math.abs(ms);

        this.getCollisions().forEach(collision => {
            console.log('COLLISION ' + collision.side);

            switch (collision.side) {
                case Side.TOP:
                    this.posY = collision.with.getY() - this.getHeight() - 1;
                    break;
                case Side.BOTTOM:
                    this.posY = collision.with.getY() + collision.with.getHeight() + 1;
                    break;
                case Side.RIGHT:
                    this.posX = collision.with.getX() - this.getWidth() - 1;
                    break;
                case Side.LEFT:
                    this.posX = collision.with.getX() + collision.with.getWidth() + 1;
                    break;
            }
        });

        if (this.state > State.MOVING || this.getCollisions().length) {
            return;
        }

        const addX = Math.round(this.speed * ms * x);
        if (this.posX + addX > Game.getWidth()) {
            this.posX = 0;
        } else {
            if (this.posX - addX < 0) {
                this.posX = Game.getWidth();
            }
        }
        this.posX += addX;

        const addY = Math.round(this.speed * ms * y);
        if (this.posY + addY > Game.getHeight()) {
            this.posY = 0;
        } else {
            if (this.posY - addY < 0) {
                this.posY = Game.getHeight();
            }
        }
        this.posY += addY;
    }

    protected getCollisions(): Collision[] {
        const collisions: Collision[] = [];

        Game.getEntities().forEach((check) => {
            const side = Game.isCollision(this, check);
            if (side) {
                collisions.push({ with: check, side });
            }
        });

        return collisions;
    }

    stop(): void {
        this.isStopped = true;
    }

    getPosition(): Position {
        return { 'x': this.posX, 'y': this.posY };
    }

    getX(): number {
        return this.posX;
    }

    setX(x: number): void {
        this.posX = x;
    }

    getY(): number {
        return this.posY;
    }

    setY(y: number): void {
        this.posY = y;
    }

    getWidth(): number {
        return this.width;
    }

    getHeight(): number {
        return this.height;
    }

    onCollision(collider: Entity): void {
        if (collider.impassable) {
            this.stop();
        }
    }

    abstract render(ctx: CanvasRenderingContext2D): void;
}
