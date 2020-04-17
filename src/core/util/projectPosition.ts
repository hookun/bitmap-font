import {Point} from '../type';

export interface ProjectResult {
    size: number,
    origin: Point,
}

export const projectPosition = (
    {size, origin, pointer, drag, scale}: {
        size: number,
        origin: Point,
        pointer: Point,
        drag: Point,
        scale: number,
    },
): ProjectResult => {
    let [ox, oy] = origin;
    if (pointer) {
        const r = 1 - scale;
        ox += r * (pointer[0] - ox);
        oy += r * (pointer[1] - oy);
        if (drag) {
            ox += scale * drag[0];
            oy += scale * drag[1];
        }
    }
    return {
        size: size * scale,
        origin: [ox, oy],
    };
};
