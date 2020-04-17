import Game from '../Game';
import TileMap from './TileMap';

export default class Tile {

    private tile: string;

    constructor(tile: string) {
        this.tile = tile;
    }

    render(x: number, y: number): void {
        const ctx = Game.get().context;
        ctx.beginPath();

        const tileImage = new Image();
        tileImage.src = 'dist/' + this.getImageName(this.tile);
        tileImage.onload = () => {
            ctx.drawImage(tileImage, x, y, Game.tileSize, Game.tileSize);
        };

        ctx.drawImage(tileImage, x, y);

        ctx.rect(x, y, Game.tileSize, Game.tileSize);
        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'white';
        ctx.stroke();
        ctx.fill();
    }

    getImageName(tile: string): string {
        switch (tile) {
            case TileMap.TILE_BLOCK:
                return 'tile017.png';
            default: // TILE_EMPTY
                return 'tile050.png';
        }
    }

}
