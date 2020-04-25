import Tile from './Tile/Tile';
import Wall from './Tile/Wall';
import Empty from './Tile/Empty';

export default abstract class TileFactory {

    static readonly SYMBOL_WALL = '#';
    static readonly SYMBOL_EMPTY = '.';


    static make(symbol: string, x: number, y: number): Tile {
        switch (symbol) {
            case this.SYMBOL_WALL:
                return new Wall(x, y);
        }

        return new Empty(x, y);
    }



}
