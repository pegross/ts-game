import Game from './lib/Game';

window.onload = () => {
    const canvas = document.getElementById('game');

    if (canvas instanceof HTMLCanvasElement) {
        Game.setCanvas(canvas).start();
        // @ts-ignore
        window.myGame = Game;
    } else {
        throw new Error('Canvas passed to game is not a HTMLCanvasElement');
    }
};
