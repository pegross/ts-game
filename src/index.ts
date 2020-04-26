import Game from './lib/Game';

window.onload = () => {
    const canvasBack = document.getElementById('game-lay-1');
    const canvasFront = document.getElementById('game-lay-2');

    if (canvasFront instanceof HTMLCanvasElement && canvasBack instanceof HTMLCanvasElement) {
        Game.setCanvas(canvasBack, canvasFront).start();
        // @ts-ignore
        window.myGame = Game;
    } else {
        throw new Error('Canvas passed to game is not a HTMLCanvasElement');
    }
};
