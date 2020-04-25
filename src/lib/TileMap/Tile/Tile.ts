import Game from '../../Game';
import TileMap from '../TileMap';
import Entity from '../../Entity/Entity';

export default abstract class Tile {

    name = '';
    passable = true;

    protected imageName = 'tile000.png';
    protected x: number;
    protected y: number;


    private entity: Entity | undefined;

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

        if (this.entity) {
            this.entity.render();
        }
    }

    top(steps = 1): Tile | undefined {
        return TileMap.get().tile(this.x, this.y - steps);
    }

    right(steps = 1): Tile | undefined {
        return TileMap.get().tile(this.x + steps, this.y);
    }

    bottom(steps = 1): Tile | undefined {
        return TileMap.get().tile(this.x, this.y + steps);
    }

    left(steps = 1): Tile | undefined {
        return TileMap.get().tile(this.x - steps, this.y);
    }

    enter(entity: Entity) {
        if (!this.entity) {
            this.entity = entity;
        }
    }

    getX(): number {
        return this.x;
    }

    getY(): number {
        return this.y;
    }

    leave(entity: Entity) {
        this.entity = undefined;
    }

}
