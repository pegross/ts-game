import Tile from './Tile';

export default class Empty extends Tile {
    name = 'empty';
    passable = true;
    protected imageName = 'tile050.png';
}
