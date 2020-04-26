import Tile from '../TileMap/Tile/Tile';
import TileMap from '../TileMap/TileMap';
import Game from '../Game';

export default abstract class Entity {

    protected imageName = 'tile132.png';
    protected faceRight = true;
    tile: Tile | undefined;

    protected loadedImage: HTMLImageElement | undefined;

    protected constructor(x: number, y: number) {
        const tile = TileMap.get().tile(x, y);
        if (tile) {
            this.tile = tile;
            tile.enter(this);
        }
    }

    render(): void {
        const tile = this.tile;
        if (tile) {
            const ctx = Game.get().contextFront;

            // This allows for multiple layers of png
            // @see https://stackoverflow.com/a/16388454
            ctx.save();

            let dx = tile.getX() * Game.TILE_SIZE;

            if (!this.faceRight) {
                ctx.translate(tile.getX(), tile.getY());
                ctx.scale(-1, 1);
                dx *= -1;
                dx -= Game.TILE_SIZE;
            }
            if (!this.loadedImage) {
                const tileImage = new Image();
                tileImage.src = 'dist/' + this.imageName;
                tileImage.onload = () => {
                    this.loadedImage = tileImage;
                    ctx.drawImage(this.loadedImage, dx, tile.getY() * Game.TILE_SIZE, Game.TILE_SIZE, Game.TILE_SIZE);
                };
            } else {
                ctx.drawImage(this.loadedImage, dx, tile.getY() * Game.TILE_SIZE, Game.TILE_SIZE, Game.TILE_SIZE);
            }

            ctx.restore();
        }
    }

    move(modX: number, modY: number) {
        if (modX > 0) {
            this.faceRight = true;
        }
        if (modX < 0) {
            this.faceRight = false;
        }

        if (this.tile) {
            console.log('moving. current pos: ' + this.tile.getX() + ' ' + this.tile.getY());
            const target = TileMap.get().tile(this.tile.getX() + modX, this.tile.getY() + modY);
            // TODO: check each tile on way if passable
            if (target && target.passable) {
                this.tile.leave();
                target.enter(this);
                this.tile = target;
            }
        }
    }
}
