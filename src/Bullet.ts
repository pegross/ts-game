import Entity from './Entity';
import Settings from './Settings';

export default class Bullet extends Entity
{

    constructor(posX: number, posY: number, width: number) {
        super(0.05, posX, posY, width, width, true, false, true);
    }

    render(ctx: CanvasRenderingContext2D): void
    {
        ctx.beginPath();
        ctx.rect(this.posX, this.posY, this.width, this.height);
        ctx.strokeStyle = 'red';
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.stroke();
    }
}
