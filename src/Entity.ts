import Game from './Game';
import { DirectionX, DirectionY, State } from './enums';

export default abstract class Entity {

    protected state: State;

    protected speed: number;
    protected posX: number;
    protected posY: number;
    protected width: number;
    protected height: number;

    protected constructor(speed: number, posX: number, posY: number, width: number, height: number) {
        this.state = State.IDLE;
        this.speed = speed;
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;

        Game.registerEntity(this);
    }

    move(x: DirectionX, y: DirectionY, ms: number): void {
        if (this.state > State.MOVING) {
            return;
        }

        const addX = this.speed * ms * x;
        if (this.posX + addX > Game.getWidth()) {
            this.posX = 0;
        } else {
            if (this.posX - addX < 0) {
                this.posX = Game.getWidth();
            }
        }
        this.posX += addX;

        const addY = this.speed * ms * y;
        if (this.posY + addY > Game.getHeight()) {
            this.posY = 0;
        } else {
            if (this.posY - addY < 0) {
                this.posY = Game.getHeight();
            }
        }
        this.posY += addY;
    }

    abstract render(ctx: CanvasRenderingContext2D): void;
}
