import Tile from './Tile';

export default class Wall extends Tile {
    name = 'wall';
    passable = false;
    protected imageName = 'tile017.png';
}
