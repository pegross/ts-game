import Entity from './Entity';
import Game from '../Game';

export default class Player extends Entity {

    constructor(x: number, y: number) {
        super(x, y);

        window.addEventListener('keypress', e => {
            console.log(e);
            switch (e.key) {
                case 'a':
                    this.move(-1, 0);
                    break;
                case 'd':
                    this.move(1, 0);
                    break;
                case 'w':
                    this.move(0, -1);
                    break;
                case 's':
                    this.move(0, 1);
            }
        });

    }

    move(modX: number, modY: number) {
        super.move(modX, modY);
        Game.get().turn();
    }

}
