import Tile from './Tile';
import Game from '../Game';
import txt from '../maps/01.tilemap';

export default class TileMap {

    private tiles: Tile[];
    private width = 0;
    private height = 0;

    constructor() {
        this.tiles = [];
        this.width = 5;
    }

    load() {
        console.log(txt);
        // const file = readFileSync('./maps/01.tilemap', 'utf-8');

        // console.log(file);
    }

    render() {
        let x = 0;
        let y = 0; // -Game.tileSize;
        let numInRow = 0;

        this.tiles.forEach((tile) => {
            numInRow++;
            tile.render(x, y);
            x += Game.tileSize;
            if (numInRow >= this.width) {
                y += Game.tileSize;
                numInRow = 0;
                x = 0;
            }
        });
    }

}
