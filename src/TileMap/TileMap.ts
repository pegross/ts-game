import Tile from './Tile';
import Game from '../Game';
import mapData from '../maps/01.tilemap';

export default class TileMap {

    static readonly TILE_EMPTY = '.';
    static readonly TILE_BLOCK = '#';

    private tiles: Tile[];
    private width = 0;
    private height = 0;

    private rawMapData: string;

    constructor() {
        this.tiles = [];
        this.width = 0;
        this.rawMapData = mapData;
    }

    load() {
        const lines = this.rawMapData.split('\n');
        lines.pop();

        let longest = 0;

        // determine longest line
        lines.forEach((line) => {
            if (line.length > longest) {
               longest = line.length;
            }
        });
        this.width = longest;

        // fill short lines with empty tiles
        lines.forEach((line) => {
            if (line.length < longest) {
                for (let i = line.length; i < longest; i++) {
                    line = line + TileMap.TILE_EMPTY;
                }
            }
        });

        lines.forEach((line) => {
            line.split('').forEach((char) => {
               switch (char) {
                   case TileMap.TILE_EMPTY:
                       this.tiles.push(new Tile(TileMap.TILE_EMPTY));
                       break;
                   case TileMap.TILE_BLOCK:
                       this.tiles.push(new Tile(TileMap.TILE_BLOCK));
               }
            });
            console.log(this.tiles);
        })

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
