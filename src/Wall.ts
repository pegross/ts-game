import Entity from './Entity';
import Settings from './Settings';
import { DirectionX, DirectionY, State } from './enums';

export default class Wall extends Entity {

    constructor(posX: number, posY: number, width: number, height: number) {
        super(0, posX, posY, width, height, true, true);
    }

    render(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.rect(this.posX, this.posY, this.width, this.height);
        ctx.strokeStyle = 'brown';
        ctx.fillStyle = 'brown';
        ctx.fill();
        ctx.stroke();
    }

    onCollision(collider: Entity): void {
    }
}
