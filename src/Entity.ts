import Game from "./Game";
import { DirectionX, DirectionY, State } from "./enums";

export default abstract class Entity
{

    protected state: State;

    protected speed: number;
    protected posX: number;
    protected posY: number;
    protected width: number;
    protected height: number;

    protected constructor(speed: number, posX: number, posY: number, width: number, height: number)
    {

        this.state = State.IDLE;

        this.speed = speed;
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;

        let game = Game.get();
        if (game) {
            game.registerEntity(this);
        }

    }

    public move(x: DirectionX, y: DirectionY, ms: number): void
    {
        if(this.state > State.MOVING) {
            return;
        }

        this.posX += this.speed * ms * x;
        this.posY += this.speed * ms * y;
    }

    abstract render(ctx: CanvasRenderingContext2D): void;
}