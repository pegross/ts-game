
export default abstract class Entity {
    protected constructor() {}
    abstract render(ctx: CanvasRenderingContext2D): void;
}
