import Entity from './Entity';
import Settings from './Settings';
import { DirectionX, DirectionY, Side, State } from './enums';

export default class Player extends Entity {

    color = 'blue';

    constructor() {
        super(
            Settings.playerBaseSpeed,
            Settings.playerStartX,
            Settings.playerStartY,
            Settings.playerWidth,
            Settings.playerHeight,
            true,
            false,
            false,
            true
        );
    }

    render(ctx: CanvasRenderingContext2D): void {
        ctx.font = '16px serif';
        ctx.fillText('x:' + this.posX + 'y:' + this.posY, 20, 20);
        ctx.beginPath();
        ctx.rect(this.posX, this.posY, this.width, this.height);
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();
    }

    onCollision(collider: Entity, side: Side): void {
        super.onCollision(collider, side);
        console.log('Side: ' + side);
        this.color = 'red';
    }
}
