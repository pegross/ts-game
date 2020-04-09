import Entity from './Entity';
import Settings from './Settings';

export default class Bullet extends Entity
{

    constructor(x: number, y: number, size: number)
    {
        super(1.5, x, y, size, size);
    }

    render(ctx: CanvasRenderingContext2D): void
    {
        ctx.beginPath();
        ctx.arc(this.posX, this.posY, this.width, 0, 2 * Math.PI);
        ctx.strokeStyle = 'red';
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.stroke();

    }
}