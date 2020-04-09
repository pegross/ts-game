import Entity from './Entity';
import Settings from './Settings';
import { DirectionX, DirectionY, State } from './enums';

export default class Player extends Entity
{

    constructor()
    {
        super(
            Settings.playerBaseSpeed,
            Settings.playerStartX,
            Settings.playerStartY,
            Settings.playerWidth,
            Settings.playerHeight
        );
    }

    render(ctx: CanvasRenderingContext2D): void
    {
        ctx.beginPath();
        ctx.rect(this.posX, this.posY, this.width, this.height);
        ctx.strokeStyle = 'blue';
        ctx.fillStyle = 'blue';
        ctx.fill();
        ctx.stroke();
    }
}