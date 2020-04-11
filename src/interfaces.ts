import Entity from './Entity';
import { Side } from './enums';

export interface Position {
    x: number;
    y: number;
}

export interface Collision {
    with: Entity;
    side: Side;
}
