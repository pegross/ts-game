import Game from './Game';

window.onload = function () {
    const canvas = document.getElementById('game');

    if (canvas instanceof HTMLCanvasElement) {
        let game = Game.make(canvas);
        game.start();

        // @ts-ignore
        window.myGame = Game;
    } else {
        throw "Canvas passed to game is not a HTMLCanvasElement";
    }
};

