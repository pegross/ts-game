import Game from './Game';
import { DirectionX, DirectionY, Side, State } from './enums';
import { Collision, Position } from './interfaces';
import Player from './Player';

export default abstract class Entity {

    canCollide: boolean;
    impassable: boolean;

    protected state: State;

    top = 0;
    bottom = 0;
    right = 0;
    left = 0;

    oldTop = 0;
    oldBottom = 0;
    oldRight = 0;
    oldLeft = 0;

    protected speed = 0;
    protected posX = 0;
    protected posY = 0;
    protected width = 0;
    protected height = 0;

    protected isStopped = false;

    protected constructor(speed: number, posX: number, posY: number, width: number, height: number, canCollide = true, impassable = false) {
        this.state = State.IDLE;
        this.speed = speed;
        this.width = width;
        this.height = height;
        this.canCollide = canCollide;
        this.impassable = impassable;
        this.setX(posX);
        this.setY(posY);

        Game.registerEntity(this);
    }

    // TODO: allow late adding of entities

    move(x: DirectionX, y: DirectionY, ms: number): void {
        ms = Math.abs(ms);
        if (this.state > State.MOVING) {
            return;
        }

        const addX = Math.round(this.speed * ms * x);
        if (this.posX + addX > Game.getWidth()) {
            this.setX(0);
        } else {
            if (this.posX - addX < 0) {
                this.setX(Game.getWidth());
            }
        }
        let newX = this.getX() + addX;

        const addY = Math.round(this.speed * ms * y);
        if (this.posY + addY > Game.getHeight()) {
            this.setY(0);
        } else {
            if (this.posY - addY < 0) {
                this.setY(Game.getHeight());
            }
        }
        let newY = this.getY() + addY;

        this.getCollisions().forEach(collision => {
            switch (collision.side) {
                case Side.TOP:
                    newY = collision.with.bottom + 1;
                    break;
                case Side.BOTTOM:
                    newY = collision.with.top - 1 - this.getWidth();
                    break;
                case Side.RIGHT:
                    newX = collision.with.left - 1 - this.getWidth();
                    break;
                case Side.LEFT:
                    newX = collision.with.right + 1;
                    break;
            }
        });
        this.setX(newX);
        this.setY(newY);

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

    protected setX(x: number): void {
        this.posX = x;
        this.oldLeft = this.left;
        this.oldRight = this.right;

        this.left = x;
        this.right = x + this.width;
    }

    protected setY(y: number): void {
        this.posY = y;
        this.oldTop = this.top;
        this.oldBottom = this.bottom;

        this.top = y;
        this.bottom = y + this.height;
    }

    getX(): number {
        return this.posX;
    }

    getY(): number {
        return this.posY;
    }

    getWidth(): number {
        return this.width;
    }

    getHeight(): number {
        return this.height;
    }

    onCollision(collider: Entity, side: Side): void {
        if (collider.impassable) {
            this.stop();
        }
    }

    abstract render(ctx: CanvasRenderingContext2D): void;
}
