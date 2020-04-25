import Tile from '../TileMap/Tile/Tile';
import TileMap from '../TileMap/TileMap';
import Game from '../Game';

export default abstract class Entity {

    protected imageName = 'tile132.png';
    tile: Tile | undefined;

    constructor(x: number, y: number) {
        const tile = TileMap.get().tile(x, y);
        if (tile) {
            this.tile = tile;
            tile.enter(this);
        }
    }

    render(): void {
        const tile = this.tile;
        if (tile) {
            const ctx = Game.get().context;

            // This allows for multiple layers of png
            // @see https://stackoverflow.com/a/16388454
            ctx.globalCompositeOperation = 'destination-over';
            ctx.beginPath();

            const tileImage = new Image();
            tileImage.src = 'dist/' + this.imageName;
            tileImage.onload = () => {
                ctx.drawImage(tileImage, tile.getX(), tile.getY(), Game.TILE_SIZE, Game.TILE_SIZE);
            };

            ctx.drawImage(tileImage, tile.getX(), tile.getY());

            // This allows for multiple layers of png - reset
            ctx.globalCompositeOperation = 'source-over';
        }
    }

    move(modX: number, modY: number) {
        if (this.tile) {
            const target = TileMap.get().tile(this.tile.getX() + modX, this.tile.getY() + modY);
            // TODO: check each tile on way if passable
            if (target && target.passable) {
                this.tile.leave(this);
                target.enter(this);
            }
        }
    }
}
