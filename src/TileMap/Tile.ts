import Game from '../Game';

export default class Tile {

    render(x: number, y: number): void {
        console.log('Drawing tile at ' + x + ', ' + y);
        const ctx = Game.get().context;
        ctx.beginPath();

        const tileImage = new Image();
        tileImage.src = 'dist/tile005.png';
        tileImage.onload = () => {
            ctx.drawImage(tileImage, x, y, Game.tileSize, Game.tileSize);
        };

        ctx.drawImage(tileImage, x, y);

        ctx.rect(x, y, Game.tileSize, Game.tileSize);
        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'white';
        ctx.stroke();
        ctx.fill();
    }

}
