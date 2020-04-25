import Game from '../../Game';
import TileMap from '../TileMap';
import Entity from '../../Entity';

export default abstract class Tile {

    name = '';

    protected imageName = 'tile000.png';
    protected x: number;
    protected y: number;

    private entities: Entity[] = [];

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    render(): void {
        const ctx = Game.get().context;
        ctx.beginPath();

        const tileImage = new Image();
        tileImage.src = 'dist/' + this.imageName;
        tileImage.onload = () => {
            ctx.drawImage(tileImage, this.x, this.y, Game.TILE_SIZE, Game.TILE_SIZE);
        };

        ctx.drawImage(tileImage, this.x, this.y);

        ctx.rect(this.x, this.y, Game.TILE_SIZE, Game.TILE_SIZE);
        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'white';
        ctx.stroke();
        ctx.fill();
    }

    top(): Tile | undefined {
        return TileMap.get().tile(this.x, this.y - 1);
    }

    right(): Tile | undefined {
        return TileMap.get().tile(this.x + 1, this.y);
    }

    bottom(): Tile | undefined {
        return TileMap.get().tile(this.x, this.y + 1);
    }

    left(): Tile | undefined {
        return TileMap.get().tile(this.x - 1, this.y);
    }

    enter(entity: Entity) {
        this.entities.push(entity);
    }

    leave(entity: Entity) {
        for (let i = 0; i <= this.entities.length; i++) {
            if (this.entities[i] === entity) {
                this.entities.splice(i, 1);
                return;
            }
        }
    }

}
