import Game from '../../Game';

export default abstract class Tile {

    protected imageName = 'tile000.png';
    protected x: number;
    protected y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    render(): void {
        const ctx = Game.get().context;
        ctx.beginPath();

        const tileImage = new Image();
        tileImage.src = 'dist/' + this.imageName;
        tileImage.onload = () => {
            ctx.drawImage(tileImage, this.x, this.y, Game.TILE_SIZE, Game.TILE_SIZE);
        };

        ctx.drawImage(tileImage, this.x, this.y);

        ctx.rect(this.x, this.y, Game.TILE_SIZE, Game.TILE_SIZE);
        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'white';
        ctx.stroke();
        ctx.fill();
    }
}
