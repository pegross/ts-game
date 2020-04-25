import Tile from './Tile/Tile';
import Game from '../Game';
import TileFactory from './TileFactory';
import mapData from '../../maps/01.tilemap';

export default class TileMap {

    private tiles: Tile[] = [];
    private width = 0; // in tiles
    private height = 0; // in tiles

    private rawMapData: string;

    constructor() {
        this.width = 0;
        this.rawMapData = mapData;
    }

    load() {
        const lines = this.rawMapData.split('\n');
        lines.pop(); // last line is always empty, remove it

        // set height
        this.height = lines.length;

        // determine longest line, this is the width
        lines.forEach((line) => {
            if (line.length > this.width) {
               this.width = line.length;
            }
        });

        // fill short lines with empty tiles
        lines.forEach((line) => {
            if (line.length < this.width) {
                for (let i = line.length; i < this.width; i++) {
                    line = line + TileFactory.SYMBOL_EMPTY;
                }
            }
        });

        // -- generate the tiles, fill the tiles array --
        let x = 0;
        let y = 0;
        let numInRow = 0;

        lines.forEach((line) => {
            line.split('').forEach((char) => {
                // Make the correct tile depending on char
                const tile = TileFactory.make(char, x, y);
                this.tiles.push(tile);

                // Advance the x position and number in row
                x += Game.TILE_SIZE;
                numInRow++;

                // If row end is reached, jump to next line
                if (numInRow === this.width) {
                    y += Game.TILE_SIZE;
                    numInRow = 0;
                    x = 0;
                }
            });
        });
    }

    render() {
        this.tiles.forEach((tile) => {
            tile.render();
        });
    }
}
